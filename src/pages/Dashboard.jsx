import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Upload, Users, Mail, Eye, TrendingUp } from 'lucide-react'

const stats = [
  {
    title: 'Total de Posts',
    value: '24',
    description: '+2 este mês',
    icon: FileText,
    color: 'text-blue-600'
  },
  {
    title: 'Uploads',
    value: '156',
    description: '+12 esta semana',
    icon: Upload,
    color: 'text-green-600'
  },
  {
    title: 'Utilizadores',
    value: '1,234',
    description: '+89 este mês',
    icon: Users,
    color: 'text-purple-600'
  },
  {
    title: 'Mensagens',
    value: '45',
    description: '8 não lidas',
    icon: Mail,
    color: 'text-orange-600'
  }
]

const recentPosts = [
  {
    title: 'Gestão de Riscos em Projetos de Engenharia',
    views: 1234,
    status: 'Publicado',
    date: '2025-06-20'
  },
  {
    title: 'Implementação de Lean Six Sigma',
    views: 856,
    status: 'Rascunho',
    date: '2025-06-18'
  },
  {
    title: 'Otimização de Ativos Industriais',
    views: 2341,
    status: 'Publicado',
    date: '2025-06-15'
  }
]

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Bem-vindo ao painel de administração do seu blog
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Posts Recentes</CardTitle>
            <CardDescription>
              Os seus artigos mais recentes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{post.title}</h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {post.views}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {post.date}
                      </span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    post.status === 'Publicado' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {post.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Acesso rápido às funcionalidades principais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full p-3 text-left border rounded-lg hover:bg-accent transition-colors">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div>
                    <h4 className="font-medium">Criar Novo Post</h4>
                    <p className="text-sm text-muted-foreground">Escrever um novo artigo</p>
                  </div>
                </div>
              </button>
              
              <button className="w-full p-3 text-left border rounded-lg hover:bg-accent transition-colors">
                <div className="flex items-center space-x-3">
                  <Upload className="h-5 w-5 text-green-600" />
                  <div>
                    <h4 className="font-medium">Upload de Ficheiro</h4>
                    <p className="text-sm text-muted-foreground">Adicionar novos recursos</p>
                  </div>
                </div>
              </button>
              
              <button className="w-full p-3 text-left border rounded-lg hover:bg-accent transition-colors">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-orange-600" />
                  <div>
                    <h4 className="font-medium">Ver Mensagens</h4>
                    <p className="text-sm text-muted-foreground">8 mensagens não lidas</p>
                  </div>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

