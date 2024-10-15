'use client';

import React, { useState } from 'react';
// import { PlusCircle } from 'lucide-react';

interface Goal {
  id: string;
  name: string;
  progress: number;
  startDate: string;
  isPublic: boolean;
}

const mockGoals: Goal[] = [
  { id: '1', name: '体重5kg減量', progress: 60, startDate: '2024-03-01', isPublic: true },
  { id: '2', name: '毎日1時間運動', progress: 30, startDate: '2024-02-15', isPublic: false },
  { id: '3', name: '新しい言語を学ぶ', progress: 80, startDate: '2024-01-01', isPublic: true },
];

const Dashboard = () => {
  const [goals] = useState<Goal[]>(mockGoals);
  const [filter, setFilter] = useState<string[]>([]);

  const filteredGoals = goals.filter(goal => {
    if (filter.includes('completed') && goal.progress < 100) return false;
    if (filter.includes('incomplete') && goal.progress === 100) return false;
    if (filter.includes('public') && !goal.isPublic) return false;
    if (filter.includes('private') && goal.isPublic) return false;
    return true;
  });

  const handleCreateGoal = () => {
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">ダッシュボード</h1>
        <button
          onClick={handleCreateGoal}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          {/* <PlusCircle className="mr-2 h-4 w-4" /> 新規目標作成 */}
        </button>
      </div>

      <div className="mb-4">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          {['completed', 'incomplete', 'public', 'private'].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(prev => 
                prev.includes(item) ? prev.filter(f => f !== item) : [...prev, item]
              )}
              className={`px-4 py-2 text-sm font-medium border ${
                filter.includes(item)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } ${
                item === 'completed' ? 'rounded-l-lg' : ''
              } ${
                item === 'private' ? 'rounded-r-lg' : ''
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGoals.map(goal => (
          <div key={goal.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">{goal.name}</h2>
                <span className={`px-2 py-1 text-xs font-semibold rounded ${
                  goal.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {goal.isPublic ? "公開" : "非公開"}
                </span>
              </div>
              <div className="mb-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-sm text-gray-500">進捗: {goal.progress}%</p>
              <p className="text-sm text-gray-500">開始日: {goal.startDate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;