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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  User
} from 'lucide-react'

// Mock data - será substituído pela API
const mockPosts = [
  {
    id: 1,
    title: 'Gestão de Riscos em Projetos de Engenharia',
    slug: 'gestao-riscos-projetos-engenharia',
    excerpt: 'Uma abordagem prática para identificar e mitigar riscos em projetos de engenharia civil.',
    author: 'Cesário Machava',
    category: 'Engenharia',
    status: 'published',
    publishDate: '2025-06-20',
    viewCount: 1234,
    createdAt: '2025-06-20T10:00:00Z',
    updatedAt: '2025-06-20T10:00:00Z'
  },
  {
    id: 2,
    title: 'Implementação de Lean Six Sigma',
    slug: 'implementacao-lean-six-sigma',
    excerpt: 'Como implementar metodologias Lean Six Sigma para otimização de processos.',
    author: 'Cesário Machava',
    category: 'Gestão',
    status: 'draft',
    publishDate: null,
    viewCount: 0,
    createdAt: '2025-06-18T14:30:00Z',
    updatedAt: '2025-06-19T09:15:00Z'
  },
  {
    id: 3,
    title: 'Otimização de Ativos Industriais',
    slug: 'otimizacao-ativos-industriais',
    excerpt: 'Estratégias para maximizar o valor e performance de ativos industriais.',
    author: 'Cesário Machava',
    category: 'Ativos',
    status: 'published',
    publishDate: '2025-06-15',
    viewCount: 2341,
    createdAt: '2025-06-15T08:00:00Z',
    updatedAt: '2025-06-15T08:00:00Z'
  }
]

const statusColors = {
  published: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  draft: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  archived: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
}

const statusLabels = {
  published: 'Publicado',
  draft: 'Rascunho',
  archived: 'Arquivado'
}

export function PostsPage() {
  const [posts, setPosts] = useState(mockPosts)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleDeletePost = (postId) => {
    if (confirm('Tem certeza que deseja eliminar este post?')) {
      setPosts(posts.filter(post => post.id !== postId))
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('pt-PT')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Posts</h1>
          <p className="text-muted-foreground">
            Gerir os artigos do seu blog
          </p>
        </div>
        <Button asChild>
          <Link to="/posts/new">
            <Plus className="h-4 w-4 mr-2" />
            Novo Post
          </Link>
        </Button>
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
                  placeholder="Pesquisar posts..."
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
                  Estado: {filterStatus === 'all' ? 'Todos' : statusLabels[filterStatus]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterStatus('all')}>
                  Todos
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus('published')}>
                  Publicados
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus('draft')}>
                  Rascunhos
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus('archived')}>
                  Arquivados
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Posts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Posts ({filteredPosts.length})</CardTitle>
          <CardDescription>
            Lista de todos os posts do blog
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Data de Publicação</TableHead>
                  <TableHead>Visualizações</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{post.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {post.excerpt}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <User className="h-3 w-3" />
                          {post.author}
                          <Calendar className="h-3 w-3 ml-2" />
                          {formatDate(post.createdAt)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{post.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[post.status]}>
                        {statusLabels[post.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {formatDate(post.publishDate)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {post.viewCount.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/posts/${post.id}/edit`}>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/posts/${post.slug}`} target="_blank">
                              <Eye className="h-4 w-4 mr-2" />
                              Visualizar
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeletePost(post.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

