import { Button } from "@/components/ui/button";
import { fetchCategories } from "@/lib/fetchers/products";

const page = async () => {

 const categories =  await fetchCategories()

  return <div className="w-full">
    <div className="w-full">
      <div className="flex items-center justify-between w-full">
      <h2 className="text-2xl font-medium">Categories</h2>

      </div>
      <div className="w-full mt-4 grid grid-cols-3 gap-6 md:grid-cols-4">
        {categories.map((category) => (
          <div key={category.id} className="w-full shadow-md hover:bg-slate-100 hover:shadow-lg transition-all duration-200 bg-slate-200 flex items-center justify-center py-6 rounded-md">
            <p className="text-center text-slate-700 font-medium">{category.title}</p>
          </div>
        ))}
      </div>
    </div>
  </div>;
};
export default page;
