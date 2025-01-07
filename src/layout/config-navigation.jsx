import {
	IconFile,
	IconHome,
	IconSettings,
	IconShieldCheck,
	IconUsers,
	IconBriefcase,
} from "@tabler/icons-react";

const navConfig = [
	{
		title: "Inicio",
		path: "/home",
		icon: <IconHome />,
	},
	{
		title: "Inspecciones",
		path: "/inspecciones",
		icon: <IconFile />,
	},
	{
		title: "Aseguradoras",
		path: "/aseguradoras",
		icon: <IconShieldCheck />,
	},
	{
		title: "Asegurados",
		path: "/asegurados",
		icon: <IconUsers />,
	},
	{
		title: "Inspectores",
		path: "/empleados",
		icon: <IconBriefcase />,
	},
	{
		title: "Configuración",
		path: "/settings",
		icon: <IconSettings />,
	},
];

export default navConfig;
