import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Checkbox } from "../components/ui/checkbox";

const CATEGORIES = {
  BOOKS: 'Books',
  CLOTHES: 'Clothes',
  HOUSE_ITEMS: 'House Items',
  TICKETS: 'Tickets',
  SUBLETS: 'Sublets',
  ROOMMATES: 'Roommates',
  RIDESHARE: 'Rideshare',
  OTHER: 'Other'
};

const categoryItems = Object.entries(CATEGORIES).map(([id, label]) => ({
  id,
  label
}));

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const form = useForm({
    defaultValues: {
      categories: [],
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    // Handle filter application here
  };

  return (
    <div 
      className={`border-r min-h-screen bg-white text-black transition-all duration-300 ${
        isCollapsed ? 'w-12' : 'w-64'
      }`}
    >
      {/* Collapse Toggle Button */}
      <div className="flex justify-end p-2 border-b">
        <div
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-gray-100 rounded-md transition cursor-pointer"
        >
          {isCollapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          )}
        </div>
      </div>
      

      {/* Filters Content */}
      {!isCollapsed && (
        <div className="p-4">
          <h2 className="font-semibold mb-4">Filters</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Categories</h3>
                <FormField
                  control={form.control}
                  name="categories"
                  render={() => (
                    <FormItem>
                      <div className="space-y-2">
                        {categoryItems.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="categories"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-center space-x-2 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, item.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id
                                              )
                                            )
                                      }}
                                      className="rounded-sm"
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal leading-none cursor-pointer">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {/* Search */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Search</h3>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Search listings..."
                />
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    className="w-1/2 px-3 py-2 border rounded-md"
                    placeholder="Min"
                  />
                  <input
                    type="number"
                    className="w-1/2 px-3 py-2 border rounded-md"
                    placeholder="Max"
                  />
                </div>
              </div>

              {/* Apply Filters Button */}
              <button 
                type="submit"
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
              >
                Apply Filters
              </button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
