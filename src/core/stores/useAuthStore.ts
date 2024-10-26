import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";

// Define the steps in an enum for better type safety
enum AuthStep {
  CHECK_EMAIL = "checkEmail",
  ENTER_OTP = "enterOtp",
  ENTER_PASSWORD = "enterPassword",
  COMPLETE_PROFILE = "completeProfile",
  SET_PASSWORD = "setPassword",
  LOGGED_IN = "loggedIn",
}

type ProfileData = {
  name: string;
  familyName: string;
};

// Define the store's state type
interface AuthStepperState {
  step: AuthStep;
  hasAccount: boolean;
  otp: string;
  email: string;
  profileData: ProfileData;
  password: string;
  loading: boolean;
  lifeSpan: number;

  setLifeSpan: (newLifeSpan: number) => void
  setStep: (newStep: AuthStep) => void;
  setHasAccount: (hasAccount: boolean) => void;
  setOtp: (otp: string) => void;
  setEmail: (email: string) => void;
  setProfileData: (profileData: ProfileData) => void;
  setPassword: (password: string) => void;

  goToNextStep: () => void;
  resetStepper: () => void;
}

// Custom storage interface for localStorage
const customLocalStorage: PersistStorage<AuthStepperState> = {
  getItem: (name) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};

// Create the store using TypeScript types
const useAuthStepperStore = create<AuthStepperState>()(
  persist(
    (set) => ({
      // Initial state
      step: AuthStep.CHECK_EMAIL,
      hasAccount: false,
      otp: "",
      email: "",
      profileData: {
        name: "",
        familyName: "",
      },
      lifeSpan: 360,
      password: "",
      loading: true, // Initially set loading to true

      // Actions
      setLifeSpan: (newLifeSpan) => set({ lifeSpan: newLifeSpan }),
      setStep: (newStep) => set({ step: newStep }),
      setHasAccount: (hasAccount) => set({ hasAccount }),
      setOtp: (otp) => set({ otp }),
      setEmail: (email) => set({ email }),
      setProfileData: (profileData) =>
        set((state) => ({
          profileData: { ...state.profileData, ...profileData },
        })),
      setPassword: (password) => set({ password }),

      // Step Control Methods
      goToNextStep: () =>
        set((state) => {
          switch (state.step) {
            case AuthStep.CHECK_EMAIL:
              return { step: AuthStep.ENTER_OTP };
            case AuthStep.ENTER_OTP:
              return {
                step: state.hasAccount
                  ? AuthStep.ENTER_PASSWORD
                  : AuthStep.COMPLETE_PROFILE,
              };
            case AuthStep.ENTER_PASSWORD:
              return state.hasAccount ? { step: AuthStep.LOGGED_IN } : state;
            case AuthStep.COMPLETE_PROFILE:
              return { step: AuthStep.SET_PASSWORD };
            case AuthStep.SET_PASSWORD:
              return { step: AuthStep.LOGGED_IN };
            default:
              return state;
          }
        }),

      resetStepper: () =>
        set({
          step: AuthStep.CHECK_EMAIL,
          hasAccount: false,
          otp: "",
          email: "",
          profileData: {
            name: "",
            familyName: "",
          },
          password: "",
        }),
    }),
    {
      name: "auth-stepper-store", // Key for local storage
      storage: customLocalStorage, // Custom localStorage wrapper
      onRehydrateStorage: () => (state) => {
        // Set loading to false once the state has been rehydrated
        if (state) {
          state.loading = false;
        }
      },
    }
  )
);

export default useAuthStepperStore;
export { AuthStep }; // Export the enum for use in components
