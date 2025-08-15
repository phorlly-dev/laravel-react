import { PaginationProps } from "@/types/paginate";
import { Button } from "./button";


export default function Pagination({
  current,
  last,
  links,
  onChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-center space-x-1 py-4">
      {links.map((link, idx) => {
        // Laravel returns "..." as separator, so we disable that button
        const isDisabled = link.url === null;
        const isActive =
          typeof link.active === "boolean"
            ? link.active
            : Boolean(link.active === 1);

        // Extract page number from Laravel's URL
        let pageNum: number | null = null;
        if (link.url) {
          const params = new URLSearchParams(link.url.split("?")[1]);
          pageNum = Number(params.get("page"));
        }

        return (
          <button
            key={idx}
            className={`px-3 py-1 rounded-full border ${
              isActive
                ? "bg-blue-500 text-white"
                : "bg-white dark:bg-gray-800 text-black dark:text-white"
            } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => pageNum && onChange(pageNum)}
            disabled={isDisabled}
            dangerouslySetInnerHTML={{ __html: link.label || "" }} // Laravel uses HTML entities like &laquo;
          />
        );
      })}
    </div>
  );
}