export interface IHome {
  _id?: string;
  title: string;
  content: string;
  roles?: string[];   // ✅ array of strings
  image?: string;
  cvURL?: string;
  projectURL?: string;
  linkedIn?: string;
  gitHub?: string;
  email?: string;
  phone?: string;
}