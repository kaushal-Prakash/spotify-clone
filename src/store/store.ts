import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface UserData {
  userData: {
    favorites?: { _id: string }[];
    [key: string]: unknown;
  };
  updateData: (newData: Record<string, unknown>) => void;
  clearStore: () => void;
  setUserFavorites: (id: string) => void; // Accepts an ID as a parameter
}

export const UserStore = create<UserData>()(
  persist(
    (set) => ({
      userData: {},
      updateData: (newData) => set(() => ({ userData: newData })),
      clearStore: () => set(() => ({ userData: {} })),
      
      setUserFavorites: (id) =>
        set((state) => ({
          userData: {
            ...state.userData,
            favorites: [...(state.userData.favorites || []), { _id: id }], // Ensure `favorites` exists
          },
        })),
    }),
    {
      name: "user-data-storage",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => console.log("Rehydrated user data"),
    }
  )
);


export interface Song {
  createdAt: Date;
  _id: string;
  title: string;
  artist: string;
  album: { _id: string; title: string; coverImage: string };
  genre: string;
  duration: number;
  coverImage: string;
  audio: string;
}

export interface Album {
  _id: string;
  title: string;
  artist: string;
  coverImage: string;
  songs: Song[];
  releaseDate: Date;
}

export interface UserDetails {
  _id: string;
  username: string;
  email: string;
  favorites: Song[];
  uploadedSongs: Song[];
}

interface AppState {
  currentSong: Song | null;
  isPlaying: boolean;
  userDetails: UserDetails | null;
  songs: Song[];
  albums: Album[];
  setCurrentSong: (song: Song | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setUserDetails: (userDetails: UserDetails | null) => void;
  setSongs: (songs: Song[]) => void;
  setAlbums: (albums: Album[]) => void;
  addToFavorites: (song: Song) => void;
  removeFromFavorites: (songId: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentSong: null,
  isPlaying: false,
  userDetails: null,
  songs: [],
  albums: [],
  setCurrentSong: (song) => set({ currentSong: song }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setUserDetails: (userDetails) => set({ userDetails }),
  setSongs: (songs) => set({ songs }),
  setAlbums: (albums) => set({ albums }),
  addToFavorites: (song) =>
    set((state) => ({
      userDetails: state.userDetails
        ? {
            ...state.userDetails,
            favorites: [...state.userDetails.favorites, song],
          }
        : null,
    })),
  removeFromFavorites: (songId) =>
    set((state) => ({
      userDetails: state.userDetails
        ? {
            ...state.userDetails,
            favorites: state.userDetails.favorites.filter((s) => s._id !== songId),
          }
        : null,
    })),
}));