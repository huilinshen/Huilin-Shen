import { ProjectGallery } from "@/components/home/ProjectGallery";
import { homeProjects } from "@/data/home-projects";

export default function Home() {
  return <ProjectGallery projects={homeProjects} />;
}
