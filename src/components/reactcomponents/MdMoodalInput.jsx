const MoodalInput = () => {
  return (
    <div className="flex flex-col items-center justify-center h-auto w-full gap-2">
      <div className="bg-transparent w-full h-auto border-2 border-info/20 rounded-lg p-2 flex flex-row justify-between px-6 gap-2 items-center">
        <div className="h-7 aspect-square rounded-full bg-info"></div>
        <div className="font-medium text-base text-info-info">
          <p>30 September</p>
        </div>
        <div className="h-7 aspect-square rounded-full bg-info"></div>
      </div>
      <div className="bg-transparent w-full h-auto border-2 border-info/20 rounded-lg p-2 pt-4 flex flex-row justify-between px-4 gap-2 items-center">
        <div className="flex flex-col gap-2 items-center">
          <div className="aspect-square h-10 rounded-full bg-success"></div>
          <p className="text-sm font-medium">Bahagia</p>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div className="aspect-square h-10 rounded-full bg-primary/50"></div>
          <p className="text-sm font-medium">Senang</p>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div className="aspect-square h-10 rounded-full bg-warning/50"></div>
          <p className="text-sm font-medium">Santai</p>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div className="aspect-square h-10 rounded-full bg-error/50"></div>
          <p className="text-sm font-medium">Biasa</p>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div className="aspect-square h-10 rounded-full bg-secondary/50"></div>
          <p className="text-sm font-medium">Sedih</p>
        </div>
      </div>
    </div>
  );
};

export default MoodalInput;
