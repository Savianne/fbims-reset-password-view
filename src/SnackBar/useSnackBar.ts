import React, { useContext } from "react";

import { SnackBarContextProvider } from "./SnackBarContext";

function useAddSnackBar() {
    const snackbarcontext = useContext(SnackBarContextProvider);

    return snackbarcontext?.addSnackBar as (text: string, type: "error" | "success" | "info" | "warning" | "default", durationInSec: number) => void;
}

export default useAddSnackBar;