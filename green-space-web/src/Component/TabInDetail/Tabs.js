import React, { useState } from "react";

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id); // Tab mặc định là tab đầu tiên

  const renderContent = () => {
    const activeTabContent = tabs.find((tab) => tab.id === activeTab);
    return activeTabContent?.content || null;
  };

  return (
    <div className="p-5">
      {/* Tab Buttons */}
      <div className="flex space-x-2 border-b-2 border-gray-200 mb-5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-t-md font-medium text-sm ${
              activeTab === tab.id
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-600"
            } hover:bg-green-400`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 border border-gray-200 rounded-md bg-gray-50 shadow-md">
        {renderContent()}
      </div>
    </div>
  );
};

export default Tabs;
