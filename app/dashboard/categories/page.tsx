import { fetchCategories } from "@/lib/fetchers/products";
import Link from "next/link";

const page = async () => {
  const categories = await fetchCategories();
  return (
    <div>
      <div className="w-full mt-4 grid grid-cols-3 gap-6 md:grid-cols-4">
        {categories.map((category) => (
          <Link
            href={`/dashboard/categories/${category.id}`}
            key={category.id}
            className="w-full shadow-md hover:bg-slate-100 hover:shadow-lg transition-all duration-200 bg-slate-200 flex items-center justify-center py-6 rounded-md"
          >
            <p className="text-center text-slate-700 font-medium">
              {category.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default page;
