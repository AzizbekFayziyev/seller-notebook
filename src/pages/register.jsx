import { db, app } from "../firebase/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { getFirestore, collection, doc, setDoc, deleteDoc } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = ({ users }) => {
	const navigate = useNavigate();

	const [fullName, setFullname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");

	const [passwordError, setPasswordError] = useState(false);
	const [emailError, setEmailError] = useState(false);

	const [isLoading, setLoading] = useState(false);

	const createUser = async (e) => {
		e.preventDefault();

		if (!isLoading) {
			if (fullName && email && password && confirm) {
				setLoading(true);

				const usersRef = doc(db, "users", `${new Date().getTime()}`);

				await setDoc(
					usersRef,
					{
						fullname: fullName,
						email: email,
						password: password,
					},
					{ merge: true }
				);

				localStorage.setItem("email", email);

				setLoading(false);

				navigate("/");
			} else {
				alert("Fill all inputs!");
			}
		}
	};

	return (
		<div className="max-w-[550px] mx-auto my-[35px] px-[16px]">
			<div>
				<div className="flex-col justify-center items-center gap-2 flex">
					<div className="text-[#141414] text-2xl font-semibold">Register</div>
					<div className="text-[#6b6b6e] text-base font-normal">Register to access the system!</div>
				</div>

				<form onSubmit={createUser} className="w-full mt-[18px] flex-col justify-start items-start gap-4 inline-flex">
					<div className="self-stretch h-[74px] flex-col justify-start items-start gap-2 flex">
						<div className="self-stretch justify-start items-start gap-1 inline-flex">
							<div className="grow shrink basis-0 text-[#141414] text-base font-medium font-['Golos Text'] leading-[21px]">Full name</div>
						</div>
						<input required value={fullName} onChange={(e) => setFullname(e.target.value)} type="text" placeholder="Fullname!" className="w-full focus:border-gray-400 transition-all duration-300 outline-none px-4 py-3 bg-white text-[#161616] text-base rounded-xl border border-[#e3e6ea] justify-start items-center gap-3 inline-flex" />
					</div>

					<div className="self-stretch h-[74px] flex-col justify-start items-start gap-2 flex">
						<div className="self-stretch justify-start items-start gap-1 inline-flex">
							<div className="grow shrink basis-0 text-[#141414] text-base font-medium font-['Golos Text'] leading-[21px]">Email</div>
						</div>
						<input
							required
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);

								if (users?.docs.map((i) => i.data().email === e.target.value)[0]) {
									setEmailError(true);
								} else {
									setEmailError(false);
								}
							}}
							type="email"
							placeholder="Email!"
							className="w-full focus:border-gray-400 transition-all duration-300 outline-none px-4 py-3 bg-white text-[#161616] text-base rounded-xl border border-[#e3e6ea] justify-start items-center gap-3 inline-flex"
						/>
					</div>

					{emailError && <p className="text-base text-red-600">User with same email already registered!</p>}

					<div className="self-stretch h-[74px] flex-col justify-start items-start gap-2 flex">
						<div className="self-stretch justify-start items-start gap-1 inline-flex">
							<div className="grow shrink basis-0 text-[#141414] text-base font-medium font-['Golos Text'] leading-[21px]">Password</div>
						</div>
						<input required value={password} onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Password!" className="w-full focus:border-gray-400 transition-all duration-300 outline-none px-4 py-3 bg-white text-[#161616] text-base rounded-xl border border-[#e3e6ea] justify-start items-center gap-3 inline-flex" />
					</div>

					<div className="self-stretch justify-start items-start gap-1 inline-flex">
						<div className="grow shrink basis-0 text-[#141414] text-base font-medium font-['Golos Text'] leading-[21px]">Confirm password</div>
					</div>

					<input
						required
						value={confirm}
						onChange={(e) => {
							if (confirm.length) {
								if (e.target.value != password) {
									setPasswordError(true);
								} else {
									setPasswordError(false);
								}
							}
							setConfirm(e.target.value);
						}}
						type="text"
						placeholder="Confirm password!"
						className="w-full focus:border-gray-400 transition-all duration-300 outline-none px-4 py-3 bg-white text-[#161616] text-base rounded-xl border border-[#e3e6ea] justify-start items-center gap-3 inline-flex"
					/>

					{passwordError && <p className="text-base text-red-600">Password is not the same!</p>}

					{!emailError && !passwordError && (
						<button type="submit" className="px-6 w-full h-auto shadow-none outline-none cursor-pointer transition-all duration-300 hover:bg-[#3580c7] py-3 bg-[#0084ff] rounded-xl justify-center items-center gap-3 flex btn text-white">
							{isLoading && <span className="loading loading-spinner"></span>}
							Sign up
						</button>
					)}

					<div className="mt-[5px] flex w-full justify-end">
						<Link to="/login" className="text-base text-[#696969]">
							Have an account?
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
