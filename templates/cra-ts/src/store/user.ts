import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export type TUserDate = {
	id: string;
	username: string;
	token: string;
} | null;

export const userData = atom<TUserDate>({
	key: "userData",
	default: null,
	effects_UNSTABLE: [persistAtom],
});
