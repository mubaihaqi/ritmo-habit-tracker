export default function ViewInputModal() {
  return (
    <div className="bg-base-100 rounded-md p-3 flex flex-col gap-2">
      {/* Header */}
      <div className="flex flex-col items-start justify-between">
        <h4 className="font-semibold tracking-tight text-start ps-2 text-base">
          My Mood
        </h4>
        <div className="bg-info h-[2px] w-[99%] mx-auto rounded-full animate-pulse my-2"></div>
      </div>
      {/* Date Input */}
      <div className="flex flex-row gap-2">
        <input
          type="date"
          name=""
          id=""
          className="h-full p-2 items-center rounded-md bg-base-100 focus:outline-none focus:ring focus:ring-info/50"
        />
        <div className="flex flex-row items-center justify-center gap-2 bg-base-100 rounded-md p-2">
          <label htmlFor="" className="text-success text-sm font-medium">
            Happy
          </label>
          <div className="bg-success h-6 aspect-square rounded-full"></div>
        </div>
      </div>
      {/* Statistiks */}
      <div className="flex flex-col gap-1">
        <div className="flex flex-row items-center justify-between p-2 rounded-md border border-info/20 bg-base-100">
          <label htmlFor="">Emosi</label>
          <div className="flex flex-row gap-1 items-center justify-start">
            <div className="bg-success/30 h-6 aspect-square rounded-full"></div>
            <div className="bg-primary h-6 aspect-square rounded-full"></div>
            <div className="bg-warning/30 h-6 aspect-square rounded-full"></div>
            <div className="bg-secondary/30 h-6 aspect-square rounded-full"></div>
            <div className="bg-error/30 h-6 aspect-square rounded-full"></div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between p-2 rounded-md border border-info/20 bg-base-100">
          <label htmlFor="">Tidur</label>
          <div className="flex flex-row gap-1 items-center justify-start">
            <div className="bg-success/30 h-6 aspect-square rounded-full"></div>
            <div className="bg-primary/30 h-6 aspect-square rounded-full"></div>
            <div className="bg-warning/30 h-6 aspect-square rounded-full"></div>
            <div className="bg-secondary/30 h-6 aspect-square rounded-full"></div>
            <div className="bg-error h-6 aspect-square rounded-full"></div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between p-2 rounded-md border border-info/20 bg-base-100">
          <label htmlFor="">Kesehatan</label>
          <div className="flex flex-row gap-1 items-center justify-start">
            <div className="bg-success/30 h-6 aspect-square rounded-full"></div>
            <div className="bg-primary/30 h-6 aspect-square rounded-full"></div>
            <div className="bg-warning/30 h-6 aspect-square rounded-full"></div>
            <div className="bg-secondary h-6 aspect-square rounded-full"></div>
            <div className="bg-error/30 h-6 aspect-square rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
