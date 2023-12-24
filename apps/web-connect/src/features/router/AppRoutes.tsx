import {HashRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from "react-query";
import {Checkout} from "../checkout";
import {AssignWallet} from "../wallet/routes/AssignWallet.js";
import {UnassignWallet} from "@/features/wallet/routes/UnassignWallet";
import {Header} from "@/features/header/Header";
import {Footer} from "@/features/footer/Footer";
import {DropClaim} from "@/features/wallet/routes/DropClaim";

export function AppRoutes() {
	const queryClient = new QueryClient();

	return (
		<Router basename={"/"}>
			<QueryClientProvider client={queryClient}>
				<Header/>
				<Routes>
					<Route path="/drop-claim" element={<DropClaim/>}/>
					{/*<Route path="/claim-token" element={<ClaimToken/>}/>*/}
					{/*<Route path="/xai-airdrop-terms-and-conditions" element={<TermsAndConditions/>}/>*/}
					<Route path="/assign-wallet/:operatorAddress" element={<AssignWallet/>}/>
					<Route path="/unassign-wallet/:operatorAddress" element={<UnassignWallet/>}/>
					<Route path="/" element={<Checkout/>}/>
					<Route path="*" element={<Navigate to="/" replace={true}/>}/>
				</Routes>
				<Footer/>
			</QueryClientProvider>
		</Router>
	);
}
