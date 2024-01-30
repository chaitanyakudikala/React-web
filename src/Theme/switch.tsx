import { Sun, Moon } from "react-feather";

interface DarkMode {
  on: boolean;
  toggle: () => void;
}

export default function DarkModeToggleSwitch({ on, toggle }: DarkMode) {
  const handleClick = () => {
    if (typeof toggle === "function") {
      return toggle;
    } else return () => {};
  };
  return (
    <div>
      <button
        type="button"
        role="switch"
        onClick={() => {
          handleClick();
        }}
      >
        {on ? <Sun /> : <Moon />}
      </button>
    </div>
  );
}
