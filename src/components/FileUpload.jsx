import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Upload, 
  File, 
  Image, 
  Video, 
  Music, 
  FileText, 
  Archive,
  X,
  Check,
  AlertCircle
} from 'lucide-react'

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
  if (fileType.includes('document')) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  if (fileType.includes('zip') || fileType.includes('rar')) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
  return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
}

export function FileUpload({ 
  onFilesSelected, 
  maxFiles = 5, 
  maxSize = 5 * 1024 * 1024, // 5MB
  acceptedTypes = {
    'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
    'video/*': ['.mp4', '.avi', '.mov'],
    'audio/*': ['.mp3', '.wav', '.ogg'],
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'application/zip': ['.zip'],
    'application/x-rar-compressed': ['.rar']
  },
  multiple = true
}) {
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({})

  const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
    // Processar ficheiros rejeitados
    if (rejectedFiles.length > 0) {
      rejectedFiles.forEach(({ file, errors }) => {
        errors.forEach(error => {
          if (error.code === 'file-too-large') {
            alert(`Ficheiro ${file.name} é muito grande. Tamanho máximo: ${formatFileSize(maxSize)}`)
          } else if (error.code === 'file-invalid-type') {
            alert(`Tipo de ficheiro ${file.name} não é suportado.`)
          } else if (error.code === 'too-many-files') {
            alert(`Máximo de ${maxFiles} ficheiros permitidos.`)
          }
        })
      })
    }

    if (acceptedFiles.length === 0) return

    setUploading(true)
    const newFiles = []

    for (const file of acceptedFiles) {
      const fileId = Date.now() + Math.random()
      const fileData = {
        id: fileId,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading',
        progress: 0,
        url: null,
        error: null
      }

      newFiles.push(fileData)
      setUploadedFiles(prev => [...prev, fileData])

      // Simular upload com progresso
      try {
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 100))
          setUploadProgress(prev => ({ ...prev, [fileId]: progress }))
          setUploadedFiles(prev => 
            prev.map(f => f.id === fileId ? { ...f, progress } : f)
          )
        }

        // Simular URL do ficheiro após upload
        const fileUrl = URL.createObjectURL(file)
        
        setUploadedFiles(prev => 
          prev.map(f => f.id === fileId ? { 
            ...f, 
            status: 'completed', 
            progress: 100,
            url: fileUrl
          } : f)
        )
      } catch (error) {
        setUploadedFiles(prev => 
          prev.map(f => f.id === fileId ? { 
            ...f, 
            status: 'error',
            error: 'Erro no upload'
          } : f)
        )
      }
    }

    setUploading(false)
    onFilesSelected?.(newFiles)
  }, [maxFiles, maxSize, onFilesSelected])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes,
    maxFiles: multiple ? maxFiles : 1,
    maxSize,
    multiple
  })

  const removeFile = (fileId) => {
    setUploadedFiles(prev => {
      const fileToRemove = prev.find(f => f.id === fileId)
      if (fileToRemove?.url) {
        URL.revokeObjectURL(fileToRemove.url)
      }
      return prev.filter(f => f.id !== fileId)
    })
  }

  const retryUpload = async (fileId) => {
    const file = uploadedFiles.find(f => f.id === fileId)
    if (!file) return

    setUploadedFiles(prev => 
      prev.map(f => f.id === fileId ? { 
        ...f, 
        status: 'uploading',
        progress: 0,
        error: null
      } : f)
    )

    // Repetir processo de upload
    try {
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100))
        setUploadedFiles(prev => 
          prev.map(f => f.id === fileId ? { ...f, progress } : f)
        )
      }

      const fileUrl = URL.createObjectURL(file.file)
      
      setUploadedFiles(prev => 
        prev.map(f => f.id === fileId ? { 
          ...f, 
          status: 'completed', 
          progress: 100,
          url: fileUrl
        } : f)
      )
    } catch (error) {
      setUploadedFiles(prev => 
        prev.map(f => f.id === fileId ? { 
          ...f, 
          status: 'error',
          error: 'Erro no upload'
        } : f)
      )
    }
  }

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <Card>
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${isDragActive 
                ? 'border-primary bg-primary/5' 
                : 'border-muted-foreground/25 hover:border-primary/50'
              }
            `}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            {isDragActive ? (
              <p className="text-lg font-medium">Solte os ficheiros aqui...</p>
            ) : (
              <div>
                <p className="text-lg font-medium mb-2">
                  Arraste ficheiros aqui ou clique para selecionar
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Máximo {maxFiles} ficheiros, {formatFileSize(maxSize)} cada
                </p>
                <Button variant="outline">
                  Selecionar Ficheiros
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Lista de Ficheiros */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="font-medium mb-4">
              Ficheiros ({uploadedFiles.length})
            </h3>
            <div className="space-y-3">
              {uploadedFiles.map((file) => {
                const FileIcon = getFileIcon(file.type)
                return (
                  <div key={file.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <FileIcon className="h-8 w-8 text-muted-foreground flex-shrink-0" />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium truncate">{file.name}</p>
                        <div className="flex items-center space-x-2">
                          <Badge className={getFileTypeColor(file.type)}>
                            {file.type.split('/')[1]?.toUpperCase() || 'FILE'}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {formatFileSize(file.size)}
                          </span>
                        </div>
                      </div>
                      
                      {file.status === 'uploading' && (
                        <Progress value={file.progress} className="h-2" />
                      )}
                      
                      {file.status === 'error' && (
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4 text-destructive" />
                          <span className="text-sm text-destructive">{file.error}</span>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => retryUpload(file.id)}
                          >
                            Tentar Novamente
                          </Button>
                        </div>
                      )}
                      
                      {file.status === 'completed' && (
                        <div className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-600">Upload concluído</span>
                        </div>
                      )}
                    </div>
                    
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeFile(file.id)}
                      className="flex-shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

