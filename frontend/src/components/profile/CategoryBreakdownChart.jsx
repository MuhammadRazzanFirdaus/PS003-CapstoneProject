import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#6366F1", "#14B8A6", "#3B82F6", "#8B5CF6", "#F59E0B", "#10B981"];
const formatIDR = (num) => `Rp ${Number(num).toLocaleString("id-ID")}`;

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100 text-xs">
        <p className="font-bold text-gray-800 flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{backgroundColor: payload[0].payload.fill}}></span>
          {payload[0].name}
        </p>
        <p className="text-gray-900 font-bold">{formatIDR(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

export default function CategoryBreakdownChart({ categoryData, totalExpense }) {
  return (
    <div className="bg-white rounded-[20px] border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] p-6 flex flex-col md:flex-row gap-8 min-h-[300px]">
      

      <div className="w-full md:w-1/2 flex flex-col">
        <div className="mb-4">
          <h3 className="text-sm font-bold text-gray-800">Expense Breakdown</h3>
        </div>

        {categoryData && categoryData.length > 0 ? (
          <div className="flex flex-col relative w-full h-[220px]">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={75}
                    outerRadius={105}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={10}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} isAnimationActive={false} wrapperStyle={{ zIndex: 100 }} />
                </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-lg md:text-[20px] font-bold text-gray-900 tracking-tight leading-none mb-1">
                   {formatIDR(totalExpense).replace('Rp ', '')}
                </span>
             </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center h-[200px] mt-4">
             <div className="w-16 h-8 border-t-[8px] border-l-[8px] border-r-[8px] border-gray-100 rounded-tl-full rounded-tr-full mb-3"></div>
             <p className="text-xs font-bold text-gray-500">No Data</p>
          </div>
        )}
      </div>


      <div className="w-full md:w-1/2 flex flex-col border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8">
         <h3 className="text-sm font-bold text-gray-800 mb-4">Category Details</h3>
         <div className="flex flex-col gap-3 max-h-[220px] overflow-y-auto pr-2" style={{ scrollbarWidth: "thin" }}>
            {categoryData && categoryData.length > 0 ? (
               categoryData.map((entry, index) => {
                 const percentage = ((entry.value / totalExpense) * 100).toFixed(1);
                 return (
                   <div key={index} className="flex items-center justify-between p-3 rounded-xl border border-gray-50 hover:bg-gray-50 transition-colors">
                     <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        <div className="flex flex-col">
                           <span className="text-sm font-medium text-gray-800">{entry.name}</span>
                           <span className="text-[10px] font-bold text-gray-400">{percentage}%</span>
                        </div>
                     </div>
                     <span className="text-sm font-bold text-gray-900">{formatIDR(entry.value)}</span>
                   </div>
                 )
               })
            ) : (
               <p className="text-sm text-gray-400 italic">Data kosong.</p>
            )}
         </div>
      </div>
      
    </div>
  );
}
