import { useState } from "react";
import { db, app } from "../firebase/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { getFirestore, collection, doc, setDoc, deleteDoc } from "firebase/firestore";

const EditStatus = ({ i, setStatusTab }) => {
	const [isDrawerOpen, setDrawerOpen] = useState(false);

	const toggleDrawer = () => {
		setDrawerOpen(!isDrawerOpen);
	};

	const [checked, setCheked] = useState(i.data().status);

	const changeStatus = async () => {
		const ordersRef = doc(db, "orders", i.id);

		setStatusTab(checked);

		await setDoc(
			ordersRef,
			{
				status: checked,
			},
			{ merge: true }
		);

		toggleDrawer();
	};

	return (
		<div className="relative rounded-[12px] bg-gray-100">
			<div onClick={toggleDrawer} className="flex-1 text-[#0084ff] stroke-[#0085FF] hover:stroke-white hover:text-white cursor-pointer transition-all duration-300 hover:bg-[#0084ff] py-3 bg-white rounded-xl border border-[#0084ff] justify-center items-center gap-3 flex">
				<div className="text-sm font-medium">Change status</div>
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
					<path d="M5.8335 10.5H14.1668M14.1668 10.5L10.8335 7.16669M14.1668 10.5L10.8335 13.8334" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</div>

			<div className={`fixed max-w-[550px] mx-auto left-1/2 transform -translate-x-1/2 bottom-0 w-full bg-white px-[16px] pt-[8px] pb-[25px] rounded-t-[24px] shadow-lg transition-transform duration-500 ${isDrawerOpen ? "translate-y-0" : "translate-y-full"}`} style={{ zIndex: 1000 }}>
				<div className="flex justify-center">
					<div className="w-[124px] h-1.5 bg-[#f5f5f7] rounded-[28px]" />
				</div>
				<div className="w-full mt-[12px] justify-start items-center gap-2 inline-flex">
					<div className="flex-1 text-[#141414] text-base font-medium">Edit status</div>

					<div onClick={toggleDrawer} className="flex justify-end">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
							<path d="M17.657 17.6568L12.0001 12M12.0001 12L6.34326 6.34314M12.0001 12L17.657 6.34314M12.0001 12L6.34326 17.6568" stroke="#141414" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</div>
				</div>
				<div className="w-full mt-[17px] flex-col justify-start items-start gap-2 inline-flex">
					<div className="form-control w-full flex justify-between items-center">
						<label className="label w-full cursor-pointer">
							<div className="flex-1 text-[#1878f3] font-medium">New</div>

							<input onChange={(e) => setCheked("New")} checked={checked == "New"} type="radio" name="radio-10" className="radio radio-sm checked:bg-[#1878F3]" />
						</label>
					</div>

					<div className="form-control w-full flex justify-between items-center">
						<label className="label w-full cursor-pointer">
							<div className="flex-1 text-[#781ecd] font-medium">Process</div>

							<input onChange={(e) => setCheked("Process")} checked={checked == "Process"} type="radio" name="radio-10" className="radio radio-sm checked:bg-[#781ecd]" />
						</label>
					</div>

					<div className="form-control w-full flex justify-between items-center">
						<label className="label w-full cursor-pointer">
							<div className="flex-1 text-[#009a10] font-medium">Completed</div>

							<input onChange={(e) => setCheked("Completed")} checked={checked == "Completed"} type="radio" name="radio-10" className="radio radio-sm checked:bg-[#009a10]" />
						</label>
					</div>

					<div className="form-control w-full flex justify-between items-center">
						<label className="label w-full cursor-pointer">
							<div className="flex-1 text-[#ff000c] font-medium">Cancelled</div>

							<input onChange={(e) => setCheked("Cold")} checked={checked == "Cold"} type="radio" name="radio-10" className="radio radio-sm checked:bg-[#ff000c]" />
						</label>
					</div>
				</div>
				<div onClick={changeStatus} className="flex-1 mt-[16px] text-white hover:text-[#0084ff] cursor-pointer transition-all duration-300 bg-[#0084ff] py-3 hover:bg-white rounded-xl border border-[#0084ff] justify-center items-center gap-3 flex">
					<div className="text-sm font-medium">Save</div>
				</div>
			</div>

			{isDrawerOpen && <div onClick={toggleDrawer} className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" style={{ zIndex: 999 }}></div>}
		</div>
	);
};

export default EditStatus;
