const Sidebar = () => {
  return (
    <div className="p-4 w-64 border-r min-h-screen bg-gray-100 text-black">
      <h2 className="font-semibold mb-4">Filters</h2>
      <div>
        <label className="block mb-2 font-medium">Keywords</label>
        <input type="text" className="border p-2 w-full rounded" placeholder="Search course code..." />
      </div>
      <div className="mt-4">
        <label className="block font-medium">Condition</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Good
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Fair
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Poor
          </label>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
