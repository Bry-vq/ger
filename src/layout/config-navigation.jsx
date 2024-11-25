import { IconFile } from "@tabler/icons-react";
import { IconHome, IconSettings, IconShieldCheck } from "@tabler/icons-react";

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
		title: "Configuración",
		path: "/settings",
		icon: <IconSettings />,
	},
];

export default navConfig;
