import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/types/redux-type";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
