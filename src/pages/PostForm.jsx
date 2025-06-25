import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { WysiwygEditor } from '@/components/WysiwygEditor'
import { ArrowLeft, Save, Eye, Calendar } from 'lucide-react'

// Schema de validação
const postSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(200, 'Título muito longo'),
  slug: z.string().min(1, 'Slug é obrigatório').regex(/^[a-z0-9-]+$/, 'Slug deve conter apenas letras minúsculas, números e hífens'),
  excerpt: z.string().max(500, 'Resumo muito longo').optional(),
  fullContent: z.string().min(1, 'Conteúdo é obrigatório'),
  author: z.string().min(1, 'Autor é obrigatório'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  tags: z.string().optional(),
  imageUrl: z.string().url('URL inválida').optional().or(z.literal('')),
  publishDate: z.string().optional(),
  isPublished: z.boolean()
})

const categories = [
  'Engenharia',
  'Gestão',
  'Ativos',
  'Risco Operacional',
  'Lean Six Sigma',
  'Tecnologia',
  'Inovação'
]

export function PostForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = !!id
  
  const [isLoading, setIsLoading] = useState(false)
  const [content, setContent] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      fullContent: '',
      author: 'Cesário Machava',
      category: '',
      tags: '',
      imageUrl: '',
      publishDate: '',
      isPublished: false
    }
  })

  const watchTitle = watch('title')
  const watchIsPublished = watch('isPublished')

  // Gerar slug automaticamente baseado no título
  useEffect(() => {
    if (watchTitle && !isEditing) {
      const slug = watchTitle
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
        .replace(/\s+/g, '-') // Substitui espaços por hífens
        .replace(/-+/g, '-') // Remove hífens duplicados
        .trim()
      setValue('slug', slug)
    }
  }, [watchTitle, setValue, isEditing])

  // Carregar dados do post se estiver editando
  useEffect(() => {
    if (isEditing) {
      // TODO: Carregar dados do post da API
      // Por agora, vamos simular dados
      const mockPost = {
        title: 'Gestão de Riscos em Projetos de Engenharia',
        slug: 'gestao-riscos-projetos-engenharia',
        excerpt: 'Uma abordagem prática para identificar e mitigar riscos em projetos de engenharia civil.',
        fullContent: '<h2>Introdução</h2><p>A gestão de riscos é fundamental...</p>',
        author: 'Cesário Machava',
        category: 'Engenharia',
        tags: 'risco, gestão, engenharia',
        imageUrl: '',
        publishDate: '2025-06-20',
        isPublished: true
      }
      
      Object.keys(mockPost).forEach(key => {
        setValue(key, mockPost[key])
      })
      setContent(mockPost.fullContent)
    }
  }, [isEditing, id, setValue])

  const onSubmit = async (data) => {
    setIsLoading(true)
    
    try {
      // Adicionar conteúdo do editor
      data.fullContent = content
      
      // TODO: Enviar dados para a API
      console.log('Dados do post:', data)
      
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success(isEditing ? 'Post atualizado com sucesso!' : 'Post criado com sucesso!')
      navigate('/posts')
    } catch (error) {
      toast.error('Erro ao salvar o post. Tente novamente.')
      console.error('Erro:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePreview = () => {
    // TODO: Implementar preview do post
    toast.info('Funcionalidade de preview em desenvolvimento')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/posts')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {isEditing ? 'Editar Post' : 'Novo Post'}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? 'Editar um post existente' : 'Criar um novo artigo para o blog'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button 
            type="submit" 
            form="post-form"
            disabled={isLoading}
          >
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </div>

      <form id="post-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informações Básicas */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
                <CardDescription>
                  Título, slug e resumo do post
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    {...register('title')}
                    placeholder="Digite o título do post"
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    {...register('slug')}
                    placeholder="url-amigavel-do-post"
                  />
                  {errors.slug && (
                    <p className="text-sm text-destructive mt-1">{errors.slug.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="excerpt">Resumo</Label>
                  <Textarea
                    id="excerpt"
                    {...register('excerpt')}
                    placeholder="Breve descrição do post (opcional)"
                    rows={3}
                  />
                  {errors.excerpt && (
                    <p className="text-sm text-destructive mt-1">{errors.excerpt.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Editor de Conteúdo */}
            <Card>
              <CardHeader>
                <CardTitle>Conteúdo</CardTitle>
                <CardDescription>
                  Escreva o conteúdo completo do post
                </CardDescription>
              </CardHeader>
              <CardContent>
                <WysiwygEditor
                  value={content}
                  onChange={setContent}
                  height={500}
                  placeholder="Comece a escrever o seu artigo..."
                />
                {errors.fullContent && (
                  <p className="text-sm text-destructive mt-1">{errors.fullContent.message}</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publicação */}
            <Card>
              <CardHeader>
                <CardTitle>Publicação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="isPublished">Publicar</Label>
                  <Switch
                    id="isPublished"
                    {...register('isPublished')}
                  />
                </div>

                {watchIsPublished && (
                  <div>
                    <Label htmlFor="publishDate">Data de Publicação</Label>
                    <Input
                      id="publishDate"
                      type="date"
                      {...register('publishDate')}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Metadados */}
            <Card>
              <CardHeader>
                <CardTitle>Metadados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="author">Autor *</Label>
                  <Input
                    id="author"
                    {...register('author')}
                    placeholder="Nome do autor"
                  />
                  {errors.author && (
                    <p className="text-sm text-destructive mt-1">{errors.author.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="category">Categoria *</Label>
                  <Select onValueChange={(value) => setValue('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-destructive mt-1">{errors.category.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    {...register('tags')}
                    placeholder="tag1, tag2, tag3"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Separe as tags com vírgulas
                  </p>
                </div>

                <div>
                  <Label htmlFor="imageUrl">URL da Imagem</Label>
                  <Input
                    id="imageUrl"
                    {...register('imageUrl')}
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                  {errors.imageUrl && (
                    <p className="text-sm text-destructive mt-1">{errors.imageUrl.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}

