import { Menubar } from 'primereact/menubar';

export default function TeacherPanelMenu() {
    const items = [
        {
            label: 'Archivo',
            icon: 'pi pi-fw pi-file',
            items: [
                {
                    label: 'Secciones',
                    icon: 'pi pi-fw pi-book',
                    items: [
                        {
                            label: 'Ingles primero de ciencias A',
                            icon: 'pi pi-fw pi-bookmark'
                        },
                        {
                            label: 'Ingles primero de ciencias B',
                            icon: 'pi pi-fw pi-bookmark'
                        },
                              {
                            label: 'Castellano primer año A',
                            icon: 'pi pi-fw pi-bookmark'
                        },
                        {
                            label: 'Castellano segundo año A',
                            icon: 'pi pi-fw pi-bookmark'
                        },
                        {
                            label: 'Castellano primer año B',
                            icon: 'pi pi-fw pi-bookmark'
                        },
                        {
                            label: 'Castellano segundo año B',
                            icon: 'pi pi-fw pi-bookmark'
                        },

                    ]
                },
                {
                  label: 'Plan de evaluación',
                  icon: 'pi pi-fw pi-calendar',
                      items: [
                        {
                            label: 'Agregar Plan',
                            icon: 'pi pi-fw pi-calendar-plus'
                        },
                           {
                            label: 'Editar Plan',
                            icon: 'pi pi-fw pi-calendar-plus'
                        }
                    ]
                },
                {
                  separator: true
                },
                {
                    label: 'Guardar',
                    icon: 'pi pi-fw pi-save'
                }
            ]
        },
        {
            label: 'Editar',
            icon: 'pi pi-fw pi-paperclip',
            items: [
                {
                    label: 'Imprimir planilla',
                    icon: 'pi pi-fw pi-print'
                },
                {
                    label: 'Imprimir planilla vacía',
                    icon: 'pi pi-fw pi-print'
                },
                {
                    label: 'Generar PDF',
                    icon: 'pi pi-fw pi-file-pdf'
                },
                {
                    label: 'Generar Excel',
                    icon: 'pi pi-fw pi-file-excel'
                },

            ]
        },
        {
            label: 'Usuario',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'Editar datos de usuario',
                    icon: 'pi pi-fw pi-user-edit',

                },
                {
                    label: 'Cambiar contraseña',
                    icon: 'pi pi-fw pi-key',

                }
            ]
        },
        {
            label: 'Salir',
            icon: 'pi pi-fw pi-power-off'
        }
    ];

    return (
        <div className="card">
            <Menubar model={items} />
        </div>
    )
}
        