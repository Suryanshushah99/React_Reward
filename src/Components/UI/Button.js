import designs from "./Button.module.css";

function Button(Props) {
  return (
    <button
      className={designs.button}
      type={Props.type || "button"}
      onClick={Props.onClick}
    >
      {Props.children}
    </button>
  );
}

export default Button;
