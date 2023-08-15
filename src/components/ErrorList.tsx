import { ValidationErrors } from "../utils/interfaces";

interface Props {
  errors: ValidationErrors;
}

const ErrorList = ({ errors }: Props) => {
  return (
    <ul className="list-disc transition-all lg:list-none">
      {Object.entries(errors).map((entry) => (
        <li
          key={entry[0]}
          hidden={entry[1] === ""}
          className="bg-red-600 pb-1 font-bold"
        >
          &nbsp;&nbsp; {entry[1]}
        </li>
      ))}
    </ul>
  );
};

export default ErrorList;
