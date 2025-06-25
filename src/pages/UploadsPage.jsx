import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FileUpload } from '@/components/FileUpload'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Download,
  Eye,
  Calendar,
  User,
  File,
  Image,
  Video,
  Music,
  FileText,
  Archive
} from 'lucide-react'

// Mock data - será substituído pela API
const mockUploads = [
  {
    id: 1,
    title: 'Manual de Gestão de Ativos',
    slug: 'manual-gestao-ativos',
    description: 'Guia completo para gestão eficiente de ativos industriais',
    fileName: 'manual-gestao-ativos.pdf',
    fileUrl: '/uploads/manual-gestao-ativos.pdf',
    fileSize: 2048576, // 2MB
    fileType: 'application/pdf',
    category: 'Manuais',
    tags: ['gestão', 'ativos', 'manual'],
    author: 'Cesário Machava',
    downloadCount: 156,
    isPublished: true,
    isFeatured: true,
    createdAt: '2025-06-20T10:00:00Z',
    updatedAt: '2025-06-20T10:00:00Z'
  },
  {
    id: 2,
    title: 'Template de Análise de Risco',
    slug: 'template-analise-risco',
    description: 'Planilha Excel para análise estruturada de riscos operacionais',
    fileName: 'template-analise-risco.xlsx',
    fileUrl: '/uploads/template-analise-risco.xlsx',
    fileSize: 512000, // 500KB
    fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    category: 'Templates',
    tags: ['risco', 'análise', 'excel'],
    author: 'Cesário Machava',
    downloadCount: 89,
    isPublished: true,
    isFeatured: false,
    createdAt: '2025-06-18T14:30:00Z',
    updatedAt: '2025-06-18T14:30:00Z'
  },
  {
    id: 3,
    title: 'Apresentação Lean Six Sigma',
    slug: 'apresentacao-lean-six-sigma',
    description: 'Slides introdutórios sobre metodologia Lean Six Sigma',
    fileName: 'lean-six-sigma-intro.pptx',
    fileUrl: '/uploads/lean-six-sigma-intro.pptx',
    fileSize: 3145728, // 3MB
    fileType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    category: 'Apresentações',
    tags: ['lean', 'six sigma', 'metodologia'],
    author: 'Cesário Machava',
    downloadCount: 234,
    isPublished: false,
    isFeatured: false,
    createdAt: '2025-06-15T08:00:00Z',
    updatedAt: '2025-06-16T12:00:00Z'
  }
]

const getFileIcon = (fileType) => {
  if (fileType.startsWith('image/')) return Image
  if (fileType.startsWith('video/')) return Video
  if (fileType.startsWith('audio/')) return Music
  if (fileType.includes('pdf') || fileType.includes('document')) return FileText
  if (fileType.includes('zip') || fileType.includes('rar')) return Archive
  return File
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const getFileTypeColor = (fileType) => {
  if (fileType.startsWith('image/')) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  if (fileType.startsWith('video/')) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  if (fileType.startsWith('audio/')) return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
  if (fileType.includes('pdf')) return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  if (fileType.includes('document') || fileType.includes('sheet') || fileType.includes('presentation')) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  if (fileType.includes('zip') || fileType.includes('rar')) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
  return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
}

export function UploadsPage() {
  const [uploads, setUploads] = useState(mockUploads)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)

  const filteredUploads = uploads.filter(upload => {
    const matchesSearch = upload.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         upload.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         upload.fileName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || upload.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const categories = [...new Set(uploads.map(upload => upload.category))]

  const handleDeleteUpload = (uploadId) => {
    if (confirm('Tem certeza que deseja eliminar este ficheiro?')) {
      setUploads(uploads.filter(upload => upload.id !== uploadId))
    }
  }

  const handleFilesUploaded = (files) => {
    console.log('Ficheiros carregados:', files)
    // TODO: Processar ficheiros e adicionar à lista
    setIsUploadDialogOpen(false)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-PT')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Uploads</h1>
          <p className="text-muted-foreground">
            Gerir ficheiros e recursos do blog
          </p>
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Upload
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload de Ficheiros</DialogTitle>
              <DialogDescription>
                Faça upload de novos ficheiros para o blog
              </DialogDescription>
            </DialogHeader>
            <FileUpload onFilesSelected={handleFilesUploaded} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Pesquisar ficheiros..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Categoria: {filterCategory === 'all' ? 'Todas' : filterCategory}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterCategory('all')}>
                  Todas
                </DropdownMenuItem>
                {categories.map((category) => (
                  <DropdownMenuItem key={category} onClick={() => setFilterCategory(category)}>
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Uploads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUploads.map((upload) => {
          const FileIcon = getFileIcon(upload.fileType)
          return (
            <Card key={upload.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <FileIcon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{upload.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {upload.fileName}
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/uploads/${upload.id}/edit`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a href={upload.fileUrl} download>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a href={upload.fileUrl} target="_blank" rel="noopener noreferrer">
                          <Eye className="h-4 w-4 mr-2" />
                          Visualizar
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDeleteUpload(upload.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {upload.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <Badge className={getFileTypeColor(upload.fileType)}>
                    {upload.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatFileSize(upload.fileSize)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Download className="h-3 w-3" />
                    <span>{upload.downloadCount}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(upload.createdAt)}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <User className="h-3 w-3" />
                    <span>{upload.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {upload.isFeatured && (
                      <Badge variant="secondary" className="text-xs">
                        Destaque
                      </Badge>
                    )}
                    <Badge 
                      className={upload.isPublished 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }
                    >
                      {upload.isPublished ? 'Publicado' : 'Rascunho'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredUploads.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <File className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhum ficheiro encontrado</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterCategory !== 'all' 
                ? 'Tente ajustar os filtros de pesquisa.' 
                : 'Comece fazendo upload do primeiro ficheiro.'
              }
            </p>
            {!searchTerm && filterCategory === 'all' && (
              <Button onClick={() => setIsUploadDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Fazer Upload
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

