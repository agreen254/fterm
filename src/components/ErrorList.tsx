import { ValidationErrors } from "../utils/interfaces";

interface Props {
  errors: ValidationErrors;
}

const ErrorList = ({ errors }: Props) => {
  return (
    <div className="flex justify-center">
      <ul className="w-[calc(100%-0.5rem)] list-disc overflow-x-hidden transition-all lg:list-none">
        {Object.entries(errors).map((entry) => (
          <li
            key={entry[0]}
            hidden={entry[1] === ""}
            className="bg-red-600 pb-1 font-bold"
          >
            <div className="grid grid-cols-[3rem,auto]">
              <p className="pl-1">{"ERR|"}</p>
              <p>{entry[1]}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorList;
