import { useState } from "react";
import { db, app } from "../firebase/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { getFirestore, collection, doc, setDoc, deleteDoc } from "firebase/firestore";

const AddProperty = ({ setProperties }) => {
	const [isDrawerOpen, setDrawerOpen] = useState(false);

	const toggleDrawer = () => {
		setDrawerOpen(!isDrawerOpen);
	};

	const [title, setTitle] = useState("");

	const addProperty = async () => {
		setProperties((prev) => [
			...prev,
			{
				title: title,
				value: "",
			},
		]);

		toggleDrawer();
	};

	return (
		<div className="relative rounded-[12px] bg-gray-100">
			<div onClick={toggleDrawer} className="w-full cursor-pointer py-3 rounded-[10px] transition-all duration-300 hover:bg-[#f2f2f2] border border-[#f2f2f2] justify-between px-12 items-center gap-[5px] flex">
				<div className="flex-1 text-center text-[#1b1b29] text-lg font-semibold">Add field</div>
				<div className="w-10 h-10 relative">
					<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
						<rect width="40" height="40" rx="10" fill="#9E78CF" />
						<path d="M32 20C32 20.2652 31.8946 20.5196 31.7071 20.7071C31.5196 20.8946 31.2652 21 31 21H21V31C21 31.2652 20.8946 31.5196 20.7071 31.7071C20.5196 31.8946 20.2652 32 20 32C19.7348 32 19.4804 31.8946 19.2929 31.7071C19.1054 31.5196 19 31.2652 19 31V21H9C8.73478 21 8.48043 20.8946 8.29289 20.7071C8.10536 20.5196 8 20.2652 8 20C8 19.7348 8.10536 19.4804 8.29289 19.2929C8.48043 19.1054 8.73478 19 9 19H19V9C19 8.73478 19.1054 8.48043 19.2929 8.29289C19.4804 8.10536 19.7348 8 20 8C20.2652 8 20.5196 8.10536 20.7071 8.29289C20.8946 8.48043 21 8.73478 21 9V19H31C31.2652 19 31.5196 19.1054 31.7071 19.2929C31.8946 19.4804 32 19.7348 32 20Z" fill="white" />
					</svg>
				</div>
			</div>

			<div className={`fixed max-w-[550px] mx-auto left-1/2 transform -translate-x-1/2 bottom-0 w-full bg-white px-[16px] pt-[8px] pb-[25px] rounded-t-[24px] shadow-lg transition-transform duration-500 ${isDrawerOpen ? "translate-y-0" : "translate-y-full"}`} style={{ zIndex: 1000 }}>
				<div className="flex justify-center">
					<div className="w-[124px] h-1.5 bg-[#f5f5f7] rounded-[28px]" />
				</div>
				<div className="w-full mt-[12px] justify-start items-center gap-2 inline-flex">
					<div className="flex-1 text-[#141414] text-base font-medium">Add argument</div>

					<div onClick={toggleDrawer} className="flex justify-end">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
							<path d="M17.657 17.6568L12.0001 12M12.0001 12L6.34326 6.34314M12.0001 12L17.657 6.34314M12.0001 12L6.34326 17.6568" stroke="#141414" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</div>
				</div>
				<div className="self-stretch my-4 flex-col justify-start items-start gap-2 flex">
					<input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title" className="w-full focus:border-gray-400 transition-all duration-300 outline-none px-4 py-3 bg-white text-[#161616] text-sm rounded-xl border border-[#e3e6ea] justify-start items-center gap-3 inline-flex" />
				</div>
				<div onClick={addProperty} className="flex-1 mt-[16px] text-white hover:text-[#0084ff] cursor-pointer transition-all duration-300 bg-[#0084ff] py-3 hover:bg-white rounded-xl border border-[#0084ff] justify-center items-center gap-3 flex">
					<div className="text-sm font-medium">Create</div>
				</div>
			</div>

			{isDrawerOpen && <div onClick={toggleDrawer} className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" style={{ zIndex: 999 }}></div>}
		</div>
	);
};

export default AddProperty;
