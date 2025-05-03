import React, { useState, useMemo } from "react";

export interface Column<T> {
  key: string;
  title: string;
  align?: "left" | "center" | "right";
  render?: (row: T) => React.ReactNode;
}

interface Option {
  label: string;
  value: string;
}

interface TableProps<T> {
  title: string;
  description?: string;
  phrase?: string;
  columns: Column<T>[];
  data: T[];
  filterOptions?: Option[];
  filterField?: keyof T;
  totalNoOfData?: number;
  onAdd?: () => void;
}

function Table<T>({
  title,
  description,
  phrase = "Item",
  columns,
  data,
  filterOptions = [],
  filterField,
  totalNoOfData = data.length,
  onAdd,
}: TableProps<T>) {
  const [search, setSearch] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const filteredData = useMemo(() => {
    let filtered = [...data];

    if (filterField && filterValue) {
      filtered = filtered.filter(
        (row) => String(row[filterField]) === filterValue
      );
    }

    if (search) {
      filtered = filtered.filter((row) =>
        Object.values(row).some((val) =>
          String(val).toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    return filtered;
  }, [data, filterValue, filterField, search]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filteredData.slice(start, start + perPage);
  }, [filteredData, currentPage]);

  const pageCount = Math.ceil(filteredData.length / perPage);

  return (
    <div className="w-full flex items-center justify-center min-h-full p-2">
      <div className="container max-w-6xl">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                <p className="text-gray-500 mt-1">
                  {description || `Manage and monitor your ${title} here.`}
                </p>
              </div>
              {onAdd && (
                <div className="mt-4 md:mt-0">
                  <button
                    onClick={onAdd}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out"
                  >
                    Add {phrase}
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1016.65 16.65z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full"
                  placeholder={`Search ${phrase}...`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              {filterField && (
                <div>
                  <select
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-auto"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                  >
                    {filterOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                        col.align === "right"
                          ? "text-right"
                          : col.align === "center"
                          ? "text-center"
                          : "text-left"
                      }`}
                    >
                      {col.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${
                          col.align === "right"
                            ? "text-right"
                            : col.align === "center"
                            ? "text-center"
                            : "text-left"
                        }`}
                      >
                        {col.render ? col.render(row) : (row as any)[col.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between flex-col sm:flex-row">
              <div className="mb-4 sm:mb-0">
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(currentPage - 1) * perPage + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(currentPage * perPage, filteredData.length)}</span> of{' '}
                  <span className="font-medium">{filteredData.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-bold text-gray-900 hover:bg-gray-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>

                  {Array.from({ length: pageCount }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                        pageNum === currentPage
                          ? "bg-indigo-50 text-indigo-600"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(pageCount, prev + 1))}
                    disabled={currentPage === pageCount}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-bold text-gray-900 hover:bg-gray-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;