from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import openai
import mysql.connector
from dotenv import load_dotenv

# Load API key từ file .env
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

# Kết nối MySQL
def connect_db():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="123456",
        database="phu"
    )

# Lấy dữ liệu sản phẩm
def get_products():
    db = connect_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM product")
    products = cursor.fetchall()
    db.close()
    return products

# Lấy hướng dẫn mua hàng từ CSDL
def get_purchase_guide():
    db = connect_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT category, content FROM purchase_guide")
    guides = cursor.fetchall()
    db.close()
    return guides

# Tạo Flask app
app = Flask(__name__)
CORS(app)  # Cho phép nhận request từ ReactJS

@app.route("/Chatbot/message", methods=["POST"])
def chat():
    user_input = request.json.get("user_input")
    products = get_products()
    guides = get_purchase_guide()
    
    # Lọc cây cảnh và dụng cụ làm vườn
    plants = [p for p in products if "Cây" in p['name']]
    gardening_tools = [p for p in products if "Cây" not in p['name']]
    
    # Tạo chuỗi thông tin sản phẩm
    plant_info = "\n".join([f"- {p['name']} ({p['price']} VND)" for p in plants])
    gardening_tool_info = "\n".join([f"- {p['name']} ({p['price']} VND)" for p in gardening_tools])
    
    # Tạo nội dung hướng dẫn mua hàng
    guide_info = "\n".join([f"{g['category']}: {g['content']}" for g in guides])
    
    # Tạo prompt gửi tới OpenAI
    prompt = f"""
    Bạn là chatbot chuyên tư vấn cây cảnh, dụng cụ làm vườn và hướng dẫn mua hàng.

    Chỉ trả lời đúng trọng tâm câu hỏi của người dùng. Không cần giới thiệu lại về các thông tin nếu người dùng không hỏi cụ thể.

    Nếu người dùng chỉ chào (ví dụ: "hi", "hello", "xin chào") thì chỉ cần chào lại ngắn gọn, không cần giới thiệu thêm gì.

    Dưới đây là dữ liệu bạn có thể dùng nếu cần thiết:

    ### 🌿 Cây cảnh:
    {plant_info}

    ### 🛠️ Dụng cụ làm vườn:
    {gardening_tool_info}

    ### 📖 Hướng dẫn mua hàng:
    {guide_info}

    Người dùng hỏi: "{user_input}"

    Trả lời ngắn gọn, dễ hiểu và đúng trọng tâm. Dùng Markdown nếu cần.
    """



    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Bạn là chuyên gia tư vấn về cây cảnh. Hãy trả lời người dùng "
            "dựa trên dữ liệu cây cảnh và phụ kiện làm vườn dưới đây"},
            {"role": "user", "content": prompt}
        ]
    )

    return jsonify(response["choices"][0]["message"]["content"])

if __name__ == "__main__":
    app.run(debug=False)
