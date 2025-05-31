const CategoriesInput = ({ categories }) => {
  return (
    <div className="flex flex-col items-start justify-start h-full w-full gap-4 overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-info/40 scrollbar-track-base-100">
      {categories.map((category) => (
        <div
          key={category.id}
          className="bg-transparent w-full h-auto border-2 border-info/20 rounded-lg p-3 flex flex-col gap-2"
        >
          <h2 className="text-start ps-2 text-lg font-semibold text-info">
            {category.name}
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-4 px-2 py-1">
            {category.data.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-1 items-center cursor-pointer hover:opacity-80 transition-opacity"
              >
                <div className="aspect-square h-10 w-10 rounded-full bg-info/20 border border-info/30 flex items-center justify-center text-sm font-medium text-info/80"></div>
                <p className="text-xs font-medium text-center max-w-[70px] break-words leading-tight">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesInput;
