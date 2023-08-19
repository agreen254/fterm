const Button = (props: React.ComponentPropsWithoutRef<"button">) => {
  return (
    <button
      {...props}
      className="w-24 rounded-md border-2 border-black px-5 py-3 hover:bg-stone-500"
    >
      {props.children}
    </button>
  );
};

export default Button;
