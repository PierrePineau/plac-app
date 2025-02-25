// import { create } from "zustand";
// import { get, post, remove } from "./api.helper";

// // interface ApiServicePropsState {
// //   get: (path: string, queryParams?: any) => Promise<any>;
// //   create: (path: string, data: any) => Promise<void>;
// //   update: (path: string, id: string | number, data: any) => Promise<void>;
// //   delete: (path: string, id: string | number) => Promise<void>;
// // }

// export const useApiService = create<ApiServicePropsState>((set) => ({
//   get: async (path, queryParams) => {
//     const data = await handleRequest('get', path, queryParams);
//     return data;
//   },
//   create: async (path, data) => {
//     return handleRequest('post', path, data);
//   },
//   update: async (path, data) => {
//     return handleRequest('post', path, { data });
//   },
//   delete: async (path, id) => {
//     return handleRequest('delete', path + '/' + id, {});
//   }
// }));

// export function fetch = async (path, queryParams) => {
//   return handleRequest('get', path, queryParams);
// }

// export function update = async (path, data) => {
//   return handleRequest('post', path, data);
// }

// export function create = async (path, data) => {
//   return handleRequest('post', path, data);
// }

// export function remove = async (path) => {
//   return handleRequest('delete', path, {});
// }

// async function handleRequest(
//   method: 'post' | 'put' | 'delete' | 'get',
//   path: string,
//   data: any
// ) {
//   // dans path on retire le /api/ car il est déjà dans la fonction get
//   path = path.replace('/api/', '');
//   // On vérifie que le path commence par un / pour éviter les erreurs
//   if (!path.startsWith('/')) path = '/' + path;
//   const url = "/api" + path;

//   console.log(`Requesting ${method} ${url}`);
//   console.log("Data:", data);
//   try {
//     let resp;
//     switch (method) {
//       case 'get':
//         resp = await get<ResponseApi>(url, data);
//         break;
//       case 'post':
//         resp = await post<ResponseApi>(url, data);
//         break;
//       case 'put':
//         resp = await post<ResponseApi>(url, data); // Assurez-vous que votre fonction post gère les mises à jour
//         break;
//       case 'delete':
//         resp = await remove<ResponseApi>(url);
//         break;
//       default:
//         throw new Error("Invalid HTTP method");
//     }

//     console.error("RESP:", resp);
//     if (!resp.success) {
//       console.error("Error in request:", resp);
//       return null;
//     }
//     console.log("Response:", resp.data);

//     return resp.data ?? [];
//   } catch (error) {
//     console.error(`Error in ${method} request:`, error);
//     return null;
//   }
// }
