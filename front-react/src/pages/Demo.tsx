import { useState, type ReactNode } from 'react'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import { InputTextarea } from 'primereact/inputtextarea'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import { Badge } from 'primereact/badge'
import { Divider } from 'primereact/divider'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Tag, type TagProps } from 'primereact/tag'
import { ProgressBar } from 'primereact/progressbar'
import { useToast } from '../hooks/useToast'
import './Demo.css'

interface City {
  name: string
  code: string
}

interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
}

const cities: City[] = [
  { name: 'Bogotá', code: 'BOG' },
  { name: 'Medellín', code: 'MDE' },
  { name: 'Cali', code: 'CAL' },
  { name: 'Barranquilla', code: 'BAQ' },
  { name: 'Cartagena', code: 'CTG' },
]

const products: Product[] = [
  { id: 1, name: 'Laptop HP', category: 'Electrónica', price: 899.99, stock: 85 },
  { id: 2, name: 'Mouse Logitech', category: 'Accesorios', price: 29.99, stock: 95 },
  { id: 3, name: 'Teclado Mecánico', category: 'Accesorios', price: 79.99, stock: 60 },
  { id: 4, name: 'Monitor Samsung', category: 'Electrónica', price: 249.99, stock: 45 },
  { id: 5, name: 'Webcam HD', category: 'Accesorios', price: 59.99, stock: 70 },
  { id: 6, name: 'Auriculares Sony', category: 'Audio', price: 149.99, stock: 55 },
  { id: 7, name: 'SSD 1TB', category: 'Almacenamiento', price: 119.99, stock: 90 },
]

const stats = [
  { label: 'Usuarios Activos', value: '2,543', trend: '↑ 12% este mes', up: true, icon: 'icon-[ic--twotone-group]', iconColor: 'text-blue-600', iconBg: 'bg-blue-100' },
  { label: 'Ingresos', value: '$45.2K', trend: '↑ 8% este mes', up: true, icon: 'icon-[ic--twotone-attach-money]', iconColor: 'text-green-600', iconBg: 'bg-green-100' },
  { label: 'Ventas', value: '1,423', trend: '↓ 3% este mes', up: false, icon: 'icon-[ic--twotone-shopping-cart]', iconColor: 'text-purple-600', iconBg: 'bg-purple-100' },
  { label: 'Conversión', value: '3.2%', trend: '↑ 0.5% este mes', up: true, icon: 'icon-[ic--twotone-trending-up]', iconColor: 'text-orange-600', iconBg: 'bg-orange-100' },
]

const notifications = [
  { title: 'Nuevo mensaje recibido', text: 'Tienes un nuevo mensaje de María García', time: 'Hace 5 minutos', icon: 'icon-[ic--twotone-mail] text-blue-600', bg: 'bg-blue-50 hover:bg-blue-100' },
  { title: 'Pedido completado', text: 'Tu pedido #1234 ha sido entregado', time: 'Hace 1 hora', icon: 'icon-[ic--twotone-check-circle] text-green-600', bg: 'bg-green-50 hover:bg-green-100' },
  { title: 'Nueva reseña', text: 'Alguien dejó una reseña de 5 estrellas', time: 'Hace 3 horas', icon: 'icon-[ic--twotone-star] text-purple-600', bg: 'bg-purple-50 hover:bg-purple-100' },
]

const highlights = [
  { title: 'Rápido y Eficiente', text: 'Componentes optimizados para un rendimiento excepcional', icon: 'icon-[ic--twotone-bolt]', gradient: 'from-blue-400 to-blue-600' },
  { title: 'Totalmente Personalizable', text: 'Adapta cada componente a tu diseño con Tailwind CSS', icon: 'icon-[ic--twotone-palette]', gradient: 'from-purple-400 to-purple-600' },
  { title: 'Diseño Moderno', text: 'Interfaz elegante y actual que impresiona a tus usuarios', icon: 'icon-[ic--twotone-star]', gradient: 'from-pink-400 to-pink-600' },
]

const categorySeverity: Record<string, TagProps['severity']> = {
  Electrónica: 'info',
  Accesorios: 'success',
  Audio: 'warning',
  Almacenamiento: 'secondary',
}

const getCategorySeverity = (category: string) => categorySeverity[category] ?? 'info'

function CardTitle({ icon, gradient, children }: { icon: string; gradient: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`bg-gradient-to-br ${gradient} p-2 rounded-lg`}>
        <span className={`${icon} w-6 h-6 text-white`}></span>
      </div>
      <span className="text-xl font-semibold">{children}</span>
    </div>
  )
}

export default function Demo() {
  const toast = useToast()

  const [formData, setFormData] = useState<{ name: string; city: City | null; date: Date | null; accept: boolean }>({
    name: '',
    city: null,
    date: null,
    accept: false,
  })

  const showToast = () => {
    toast({
      severity: 'success',
      summary: '¡Éxito!',
      detail: 'Formulario enviado correctamente',
      life: 3000,
    })
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span className="icon-[ic--twotone-bolt] w-4 h-4"></span>
            Tecnologías Modernas
          </div>
          <h1 className="text-6xl font-extrabold text-gray-900 mb-4 leading-tight">Dashboard de Componentes</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explora una colección moderna de componentes construidos con PrimeReact, Tailwind CSS e Iconify
          </p>
        </div>

        <div className="max-w-7xl mx-auto space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <Card key={stat.label} className="hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-xs mt-2 ${stat.up ? 'text-green-600' : 'text-red-600'}`}>{stat.trend}</p>
                  </div>
                  <div className={`${stat.iconBg} p-4 rounded-2xl`}>
                    <span className={`${stat.icon} w-8 h-8 ${stat.iconColor}`}></span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Grid de dos columnas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulario Moderno */}
            <Card
              className="shadow-xl border border-gray-100"
              title={
                <CardTitle icon="icon-[ic--twotone-edit-note]" gradient="from-indigo-500 to-purple-600">
                  Formulario de Contacto
                </CardTitle>
              }
            >
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
                    <InputText
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Juan"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Apellido</label>
                    <InputText placeholder="Pérez" className="w-full" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <InputText type="email" placeholder="juan@example.com" className="w-full" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Ciudad</label>
                  <Dropdown
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.value })}
                    options={cities}
                    optionLabel="name"
                    placeholder="Selecciona tu ciudad"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha de Nacimiento</label>
                  <Calendar
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.value ?? null })}
                    placeholder="dd/mm/aaaa"
                    dateFormat="dd/mm/yy"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mensaje</label>
                  <InputTextarea placeholder="Escribe tu mensaje aquí..." rows={4} className="w-full" />
                </div>

                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                  <Checkbox
                    inputId="accept"
                    checked={formData.accept}
                    onChange={(e) => setFormData({ ...formData, accept: !!e.checked })}
                  />
                  <label htmlFor="accept" className="text-sm text-gray-700">
                    Acepto los términos y condiciones
                  </label>
                </div>

                <div className="flex gap-3">
                  <Button label="Enviar Formulario" icon="pi pi-send" className="flex-1" onClick={showToast} />
                  <Button label="Limpiar" severity="secondary" outlined icon="pi pi-refresh" />
                </div>
              </div>
            </Card>

            {/* Panel de Notificaciones */}
            <div className="space-y-6">
              <Card
                className="shadow-xl border border-gray-100"
                title={
                  <div className="flex items-center justify-between">
                    <CardTitle icon="icon-[ic--twotone-notifications]" gradient="from-pink-500 to-rose-600">
                      Notificaciones
                    </CardTitle>
                    <Badge value="3" severity="danger" />
                  </div>
                }
              >
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div
                      key={notification.title}
                      className={`flex items-start gap-3 p-4 rounded-lg transition-colors cursor-pointer ${notification.bg}`}
                    >
                      <span className={`${notification.icon} w-6 h-6 mt-1`}></span>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{notification.title}</p>
                        <p className="text-sm text-gray-600">{notification.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Botones de Acción */}
              <Card
                className="shadow-xl border border-gray-100"
                title={
                  <CardTitle icon="icon-[ic--twotone-touch-app]" gradient="from-teal-500 to-cyan-600">
                    Botones de Acción
                  </CardTitle>
                }
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Button label="Primary" size="small" />
                    <Button label="Success" severity="success" size="small" />
                    <Button label="Info" severity="info" size="small" />
                    <Button label="Warn" severity="warning" size="small" />
                    <Button label="Danger" severity="danger" size="small" />
                  </div>
                  <Divider />
                  <div className="flex flex-wrap gap-2">
                    <Button label="Outlined" outlined size="small" />
                    <Button label="Text" text size="small" />
                    <Button icon="pi pi-heart" severity="danger" rounded />
                    <Button icon="pi pi-star" severity="warning" rounded outlined />
                    <Button icon="pi pi-check" severity="success" rounded text />
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* DataTable Mejorado */}
          <Card
            className="shadow-xl border border-gray-100"
            title={
              <div className="flex items-center justify-between">
                <CardTitle icon="icon-[ic--twotone-table-chart]" gradient="from-orange-500 to-red-600">
                  Productos en Inventario
                </CardTitle>
                <div className="flex gap-2">
                  <Button icon="pi pi-filter" severity="secondary" outlined size="small" />
                  <Button icon="pi pi-download" severity="secondary" outlined size="small" />
                  <Button label="Nuevo" icon="pi pi-plus" size="small" />
                </div>
              </div>
            }
          >
            <DataTable value={products} paginator rows={5} stripedRows rowHover className="text-sm">
              <Column
                field="id"
                header="ID"
                sortable
                style={{ width: '5rem' }}
                body={(product: Product) => <Badge value={product.id} severity="secondary" />}
              />
              <Column
                field="name"
                header="Producto"
                sortable
                body={(product: Product) => (
                  <div className="flex items-center gap-3">
                    <span className="icon-[material-symbols--inventory-2] w-5 h-5 text-gray-500"></span>
                    <span className="font-semibold">{product.name}</span>
                  </div>
                )}
              />
              <Column
                field="category"
                header="Categoría"
                sortable
                body={(product: Product) => <Tag value={product.category} severity={getCategorySeverity(product.category)} />}
              />
              <Column
                field="price"
                header="Precio"
                sortable
                body={(product: Product) => <span className="text-lg font-bold text-green-600">${product.price.toFixed(2)}</span>}
              />
              <Column
                field="stock"
                header="Stock"
                sortable
                body={(product: Product) => (
                  <div className="flex items-center gap-2">
                    <ProgressBar value={product.stock} showValue={false} style={{ width: '100px', height: '8px' }} />
                    <span className="text-sm text-gray-600">{product.stock}%</span>
                  </div>
                )}
              />
              <Column
                header="Acciones"
                style={{ width: '8rem' }}
                body={() => (
                  <div className="flex gap-2">
                    <Button icon="pi pi-pencil" severity="info" text rounded size="small" />
                    <Button icon="pi pi-trash" severity="danger" text rounded size="small" />
                  </div>
                )}
              />
            </DataTable>
          </Card>

          {/* Grid de características */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((item) => (
              <Card
                key={item.title}
                className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className={`bg-gradient-to-br ${item.gradient} p-6 rounded-2xl`}>
                    <span className={`${item.icon} w-12 h-12 text-white`}></span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.text}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
