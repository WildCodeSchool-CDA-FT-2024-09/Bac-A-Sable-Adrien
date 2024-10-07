import type { Lang } from "../types/langType";

function Navbare({ label }: Lang) {
  return (
    <div>
      <div>{label}</div>
    </div>
  );
}

export default Navbare;
