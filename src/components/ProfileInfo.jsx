import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProfileInfo = ({ users }) => {
	const [isDrawerOpen, setDrawerOpen] = useState(false);

    const navigate = useNavigate()

	const toggleDrawer = () => {
		setDrawerOpen(!isDrawerOpen);
	};

	return (
		<div className="relative rounded-[12px]">
			<div onClick={toggleDrawer} className="w-[72px] cursor-pointer flex-col justify-start items-center gap-1 inline-flex">
				<div className="w-6 h-6 relative">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M3.01393 3.89886C2.25 4.95032 2.25 6.45021 2.25 9.45V14.55C2.25 17.5498 2.25 19.0497 3.01393 20.1011C3.26065 20.4407 3.55928 20.7393 3.89886 20.9861C4.95032 21.75 6.45021 21.75 9.45 21.75H14.55C17.5498 21.75 19.0497 21.75 20.1011 20.9861C20.4407 20.7393 20.7393 20.4407 20.9861 20.1011C21.75 19.0497 21.75 17.5498 21.75 14.55V9.45C21.75 6.45021 21.75 4.95032 20.9861 3.89886C20.7393 3.55928 20.4407 3.26065 20.1011 3.01393C19.0497 2.25 17.5498 2.25 14.55 2.25H9.45C6.45021 2.25 4.95032 2.25 3.89886 3.01393C3.55928 3.26065 3.26065 3.55928 3.01393 3.89886ZM14.5 8.5C14.5 9.88071 13.3807 11 12 11C10.6193 11 9.5 9.88071 9.5 8.5C9.5 7.11929 10.6193 6 12 6C13.3807 6 14.5 7.11929 14.5 8.5ZM13.4697 12.5C15.2987 12.5 16.9145 13.6909 17.456 15.4379C17.8502 16.71 16.8994 18 15.5677 18H8.43228C7.10056 18 6.1498 16.71 6.54403 15.4379C7.08546 13.6909 8.70135 12.5 10.5303 12.5H13.4697Z"
							fill="#ABABAE"
						/>
					</svg>
				</div>
				<div className="self-stretch text-center text-[#ababae] text-xs font-medium">Profile</div>
			</div>

			<div className={`fixed max-w-[550px] mx-auto left-1/2 transform -translate-x-1/2 bottom-0 w-full bg-white px-[16px] pt-[8px] pb-[25px] rounded-t-[24px] shadow-lg transition-transform duration-500 ${isDrawerOpen ? "translate-y-0" : "translate-y-full"}`} style={{ zIndex: 1000 }}>
				<div className="flex justify-center">
					<div className="w-[124px] h-1.5 bg-[#f5f5f7] rounded-[28px]" />
				</div>

				<div className="w-full mt-[12px] justify-start items-center gap-2 inline-flex">
					<div className="flex-1 text-[#141414] text-base font-medium">Author information</div>

					<div onClick={toggleDrawer} className="flex justify-end">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
							<path d="M17.657 17.6568L12.0001 12M12.0001 12L6.34326 6.34314M12.0001 12L17.657 6.34314M12.0001 12L6.34326 17.6568" stroke="#141414" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</div>
				</div>

				<div className="w-full mt-[16px] justify-between items-start flex">
					<div className="w-[100px] flex-col justify-start items-start gap-2 flex">
						<div className="self-stretch h-[18px] text-[#6b6b6e] text-xs font-normal">Name</div>
						<div className="self-stretch flex-col justify-start items-start gap-4 flex">
							<div className="w-[102px] text-[#141414] text-sm font-normal">Fullname</div>
							<div className="w-28 text-[#141414] text-sm font-normal">Email</div>
							<div className="self-stretch text-[#141414] text-sm font-normal">Password</div>
						</div>
					</div>
					<div className="flex-1 flex-col justify-start items-start gap-2 inline-flex">
						<div className="self-stretch text-center text-[#6b6b6e] text-xs font-normal font-['Golos Text'] leading-[18px]">Descriptions</div>
						<div className="self-stretch flex-col justify-start items-start gap-4 flex">
							<div className="self-stretch text-center text-[#141414] text-sm font-normal">
                                {users?.docs?.filter(i => i.data().email.toLowerCase() == localStorage.getItem("email").toLowerCase())[0]?.data()?.fullname}
                            </div>
                            <div className="self-stretch text-center text-[#141414] text-sm font-normal">
                                {users?.docs?.filter(i => i.data().email.toLowerCase() == localStorage.getItem("email").toLowerCase())[0]?.data()?.email}
                            </div>
                            <div className="self-stretch text-center text-[#141414] text-sm font-normal">
                                {users?.docs?.filter(i => i.data().email.toLowerCase() == localStorage.getItem("email").toLowerCase())[0]?.data()?.password}
                            </div>
						</div>
					</div>
				</div>

				<div onClick={() => {
                    localStorage.removeItem("email")
                    navigate("/login")
                }} className="flex-1 mt-[17px] max-w-[550px] mx-auto transition-all cursor-pointer duration-300 hover:bg-[#e7e7e9] h-11 px-6 py-4 bg-[#f5f5f7] rounded-xl justify-center items-center flex">
					<div className="text-center text-[#ff0000] text-base font-medium font-['TT Interfaces'] leading-snug">Log out</div>
				</div>

				<div onClick={toggleDrawer} className="flex-1 mt-[6px] text-white hover:text-[#0084ff] cursor-pointer transition-all duration-300 bg-[#0084ff] py-3 hover:bg-white rounded-xl border border-[#0084ff] justify-center items-center gap-3 flex">
					<div className="text-sm font-medium">Back</div>
				</div>
			</div>

			{isDrawerOpen && <div onClick={toggleDrawer} className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" style={{ zIndex: 999 }}></div>}
		</div>
	);
};

export default ProfileInfo;
