import { IconFile } from "@tabler/icons-react";
import {
	IconHome,
	IconSettings,
	IconShieldCheck,
	IconUsers,
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
		icon: <IconUsers />,
	},
	{
		title: "Configuración",
		path: "/settings",
		icon: <IconSettings />,
	},
];

export default navConfig;
