import { Route, Routes, useNavigate } from "react-router-dom";
import Wrapper from "./layout/wrapper";
import Register from "./pages/register";
import { useEffect } from "react";
import Login from "./pages/login";
import Home from "./pages/home";
import CreateOrder from "./pages/create-order";

import { db, app } from "./firebase/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { getFirestore, collection, doc, setDoc, deleteDoc } from "firebase/firestore";

const App = () => {

    const navigate = useNavigate()

    const [regions] = useCollection(collection(getFirestore(app), "regions"), {
		snapshotListenOptions: { includeMetadataChanges: true },
	});

	const [orders] = useCollection(collection(getFirestore(app), "orders"), {
		snapshotListenOptions: { includeMetadataChanges: true },
	});

    const [users] = useCollection(
        collection(getFirestore(app), 'users'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },    
        }
    );

    useEffect(() => {
        if (!localStorage.getItem("email")) {
            navigate("/register")
        }
    }, [])

	return (
        <div>
            <Wrapper>
                <div>
                    <Routes>
                        <Route path="/register" element={<Register users={users} />} />
                        <Route path="/login" element={<Login users={users} />} />
                        <Route path="/" element={<Home orders={orders} regions={regions} users={users} />} />
                        <Route path="/create-order" element={<CreateOrder orders={orders} regions={regions} users={users} />} />
                    </Routes>
                </div>
            </Wrapper>
        </div>
    );
};

export default App;