import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MoreDrawer = ({ i }) => {

	const navigate = useNavigate()

	const [isDrawerOpen, setDrawerOpen] = useState(false);

	const toggleDrawer = () => {
		setDrawerOpen(!isDrawerOpen);
	};

	return (
		<div className="relative rounded-[12px] bg-gray-100">
			<div onClick={toggleDrawer} className="flex-1 text-black cursor-pointer transition-all duration-300 hover:bg-[#ececf1] px-6 py-3 bg-[#f9f9ff] rounded-xl justify-center items-center gap-3 flex">
				<div className="text-sm font-medium">More</div>
			</div>

			<div className={`fixed max-w-[550px] mx-auto left-1/2 transform -translate-x-1/2 bottom-0 w-full bg-white px-[16px] pt-[8px] pb-[25px] rounded-t-[24px] shadow-lg transition-transform duration-500 ${isDrawerOpen ? "translate-y-0" : "translate-y-full"}`} style={{ zIndex: 1000 }}>
				<div className="flex justify-center">
					<div className="w-[124px] h-1.5 bg-[#f5f5f7] rounded-[28px]" />
				</div>

				<div className="w-full mt-[12px] justify-start items-center gap-2 inline-flex">
					<div className="flex-1 text-[#141414] text-base font-medium">Order list</div>

					<div className="flex-1 text-[#141414] text-base font-medium">Author: {i.data().author}</div>

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
							<div className="w-[102px] text-[#141414] text-sm font-normal">Client name</div>
							<div className="w-28 text-[#141414] text-sm font-normal">Xonalar soni</div>
							<div className="self-stretch text-[#141414] text-sm font-normal">Manzili</div>
							<div className="self-stretch text-[#141414] text-sm font-normal">Budjet</div>

							{i.data()?.arguments?.map((i) => (
								<div className="self-stretch text-[#141414] text-sm font-normal">{i?.title}</div>
							))}
						</div>
					</div>
					<div className="flex-1 flex-col justify-start items-start gap-2 inline-flex">
						<div className="self-stretch text-center text-[#6b6b6e] text-xs font-normal font-['Golos Text'] leading-[18px]">Descriptions</div>
						<div className="self-stretch flex-col justify-start items-start gap-4 flex">
							<div className="self-stretch text-center text-[#141414] text-sm font-normal">{i.data().client}</div>
							<div className="self-stretch text-center text-[#141414] text-sm font-normal">{i.data().rooms_count}</div>
							<div className="self-stretch text-center text-[#141414] text-sm font-normal">{i.data().location}</div>
							<div className="self-stretch text-center text-[#141414] text-sm font-normal">{i.data().budget}</div>
							{i.data()?.arguments?.map((i) => (
								<div className="self-stretch text-center text-[#141414] text-sm font-normal">{i.value}</div>
							))}
						</div>
					</div>
				</div>

				<div onClick={toggleDrawer} className="flex-1 mt-[16px] text-white hover:text-[#0084ff] cursor-pointer transition-all duration-300 bg-[#0084ff] py-3 hover:bg-white rounded-xl border border-[#0084ff] justify-center items-center gap-3 flex">
					<div className="text-sm font-medium">Back</div>
				</div>
				<div onClick={() => {
					navigate(`/create-order?id=${i.id}`)
				}} className="flex-1 mt-[16px] text-white hover:text-[#fff] cursor-pointer transition-all duration-300 bg-[#008000] py-3 hover:bg-[#008000] rounded-xl justify-center items-center gap-3 flex">
					<div className="text-sm font-medium">Edit</div>
				</div>
			</div>

			{isDrawerOpen && <div onClick={toggleDrawer} className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" style={{ zIndex: 999 }}></div>}
		</div>
	);
};

export default MoreDrawer;
