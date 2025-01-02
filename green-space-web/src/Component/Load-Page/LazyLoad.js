import { Suspense } from "react";
import { Spin } from "antd";

const Lazyloader = ({ Children }) => {
  return (
    <Suspense
      fallback={
        <>
          <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-[255,255,255,0.5]">
            <Spin size="Large"></Spin>
          </div>
        </>
      }
    ></Suspense>
  );
};
