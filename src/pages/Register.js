import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { getCsrf, register as performRegister } from "common/requests/auth";

const Register = () => {
  const [isLoading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [company, setCompany] = useState("");

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    await getCsrf();

    const [status] = await performRegister(name, email, password1, company);

    if (status === 201) {
      setResult("DONE");
      setLoading(false);
    } else {
      setResult("ERROR");
      setLoading(false);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div
        className={
          "flex flex-col border border-gray-100 rounded bg-white py-5 px-10 space-y-5" +
          (isLoading ? " animate-pulse  " : " ")
        }
      >
        <div className="text-2xl">Register a New Account</div>
        <div className="flex flex-col">
          <input
            type="text"
            className="border rounded-t h-8 pl-2 border-purple-200"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            type="text"
            className="border border-t-0 h-8 pl-2 border-purple-200"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            className="border border-t-0 border-b-0 h-8 pl-2 border-purple-200"
            placeholder="Password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          ></input>
          <input
            type="password"
            className="border border-t-0 h-8 pl-2 border-purple-200"
            placeholder="Repeat Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          ></input>
          <input
            type="text"
            className="border border-t-0 rounded-b h-8 pl-2 border-purple-200"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          ></input>
        </div>

        <div className="flex justify-center h-10 items-center">
          {isLoading ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            <button
              onClick={register}
              className="w-20 border rounded border-purple-500 px-2 py-1 ring-2"
            >
              Submit
            </button>
          )}
        </div>
        <div className="flex justify-center h-4 items-center">
          {result === "DONE" ? <span>Success! You can login now</span> : null}
          {result === "ERROR" ? (
            <span>Could not finalize registration :(</span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Register;
