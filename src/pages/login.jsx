import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ users }) => {

	const [isLoading, setLoading] = useState(false)

	const navigate = useNavigate()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [passwordError, setPasswordError] = useState(false)
	const [emailError, setEmailError] = useState(false)

	const loginUser = async (e) => {
		e.preventDefault();

        if (!users?.docs.filter(i => i.data().email === email)) {								
            setEmailError(true)
        } else {
            const isCorrect = users?.docs.filter(i => {
                if (i.data().email.toLowerCase() === email.toLowerCase()) {
                    return i;
                }
            })            
            
            if (isCorrect[0].data().password == password) {
                setEmailError(false)
                localStorage.setItem("email", email)
                navigate("/")
            } else {
                setPasswordError(true)
            }
        }
    }

	return (
		<div className="my-[35px] px-[16px]">
			<div>
				<div className="flex-col justify-center items-center gap-2 flex">
					<div className="text-[#141414] text-2xl font-semibold">Login</div>
					<div className="text-[#6b6b6e] text-base font-normal">Enter login and password!</div>
				</div>

				<form onSubmit={loginUser} className="w-full mt-[18px] flex-col justify-start items-start gap-4 inline-flex">

					<div className="self-stretch h-[74px] flex-col justify-start items-start gap-2 flex">
						<div className="self-stretch justify-start items-start gap-1 inline-flex">
							<div className="grow shrink basis-0 text-[#141414] text-base font-medium font-['Golos Text'] leading-[21px]">Email</div>
						</div>
                        <input required value={email} onChange={e => {
							setEmail(e.target.value)
                            setEmailError(false)
						}} type='email' placeholder="Email!" className="w-full focus:border-gray-400 transition-all duration-300 outline-none px-4 py-3 bg-white text-[#161616] text-base rounded-xl border border-[#e3e6ea] justify-start items-center gap-3 inline-flex"/>
					</div>

					{emailError && <p className='text-base text-red-600'>There is no user with this email!</p>}

					<div className="self-stretch h-[74px] flex-col justify-start items-start gap-2 flex">
						<div className="self-stretch justify-start items-start gap-1 inline-flex">
							<div className="grow shrink basis-0 text-[#141414] text-base font-medium font-['Golos Text'] leading-[21px]">Passwrod</div>
						</div>
                        <input required value={password} onChange={e => {
                            setPassword(e.target.value)
                            setPasswordError(false)
                        }} type='text' placeholder="Password!" className="w-full focus:border-gray-400 transition-all duration-300 outline-none px-4 py-3 bg-white text-[#161616] text-base rounded-xl border border-[#e3e6ea] justify-start items-center gap-3 inline-flex"/>
					</div>

					{passwordError && <p className='text-base text-red-600'>Password is not correct!</p>}

					{!emailError && !passwordError && (
						<button type='submit' className="px-6 w-full h-auto shadow-none outline-none cursor-pointer transition-all duration-300 hover:bg-[#3580c7] py-3 bg-[#0084ff] rounded-xl justify-center items-center gap-3 flex btn text-white">
							{isLoading && <span className="loading loading-spinner"></span>}
							Login
						</button>
					)}

                    <div className='mt-[5px] flex w-full justify-end'>
						<Link to="/register" className='text-base text-[#696969]'>Create account</Link>
					</div>

				</form>
			</div>
		</div>
	);
};

export default Login;