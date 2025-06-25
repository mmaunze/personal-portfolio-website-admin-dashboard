import { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'

export function WysiwygEditor({ 
  value, 
  onChange, 
  height = 400,
  placeholder = "Comece a escrever...",
  disabled = false 
}) {
  const editorRef = useRef(null)

  const handleEditorChange = (content, editor) => {
    onChange(content)
  }

  const handleImageUpload = (blobInfo, progress) => {
    return new Promise((resolve, reject) => {
      // TODO: Implementar upload de imagem para o servidor
      // Por agora, vamos simular um upload
      setTimeout(() => {
        // Simular URL da imagem
        const imageUrl = `data:${blobInfo.blob().type};base64,${blobInfo.base64()}`
        resolve(imageUrl)
      }, 1000)
    })
  }

  return (
    <div className="wysiwyg-editor">
      <Editor
        apiKey="no-api-key" // Para desenvolvimento local
        onInit={(evt, editor) => editorRef.current = editor}
        value={value}
        onEditorChange={handleEditorChange}
        disabled={disabled}
        init={{
          height: height,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount', 'emoticons',
            'template', 'codesample', 'hr', 'pagebreak', 'nonbreaking'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | image media link | code preview fullscreen | help',
          content_style: `
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; 
              font-size: 14px;
              line-height: 1.6;
              color: #333;
            }
            img {
              max-width: 100%;
              height: auto;
            }
          `,
          placeholder: placeholder,
          branding: false,
          promotion: false,
          resize: true,
          
          // Configurações de imagem
          images_upload_handler: handleImageUpload,
          images_upload_base_path: '/uploads/',
          images_reuse_filename: true,
          
          // Permitir redimensionamento de imagens
          image_advtab: true,
          image_caption: true,
          image_description: false,
          image_dimensions: true,
          image_title: true,
          
          // Configurações de link
          link_assume_external_targets: true,
          link_context_toolbar: true,
          
          // Configurações de tabela
          table_responsive_width: true,
          table_default_attributes: {
            border: '1'
          },
          table_default_styles: {
            'border-collapse': 'collapse',
            'width': '100%'
          },
          
          // Configurações de código
          codesample_languages: [
            { text: 'HTML/XML', value: 'markup' },
            { text: 'JavaScript', value: 'javascript' },
            { text: 'CSS', value: 'css' },
            { text: 'Python', value: 'python' },
            { text: 'Java', value: 'java' },
            { text: 'C#', value: 'csharp' },
            { text: 'PHP', value: 'php' },
            { text: 'SQL', value: 'sql' },
            { text: 'JSON', value: 'json' }
          ],
          
          // Configurações de template
          templates: [
            {
              title: 'Artigo Técnico',
              description: 'Template para artigos técnicos',
              content: `
                <h2>Introdução</h2>
                <p>Breve introdução ao tópico...</p>
                
                <h2>Desenvolvimento</h2>
                <p>Conteúdo principal do artigo...</p>
                
                <h2>Conclusão</h2>
                <p>Resumo e considerações finais...</p>
              `
            },
            {
              title: 'Tutorial Passo a Passo',
              description: 'Template para tutoriais',
              content: `
                <h2>Pré-requisitos</h2>
                <ul>
                  <li>Requisito 1</li>
                  <li>Requisito 2</li>
                </ul>
                
                <h2>Passo 1: Título do Passo</h2>
                <p>Descrição detalhada do primeiro passo...</p>
                
                <h2>Passo 2: Título do Passo</h2>
                <p>Descrição detalhada do segundo passo...</p>
                
                <h2>Resultado Final</h2>
                <p>Descrição do resultado esperado...</p>
              `
            }
          ],
          
          // Configurações de acessibilidade
          a11y_advanced_options: true,
          
          // Configurações de idioma
          language: 'pt_PT',
          
          // Configurações de tema (adaptar ao dark mode)
          skin: 'oxide',
          content_css: 'default',
          
          // Configurações de validação
          verify_html: false,
          
          // Configurações de performance
          cache_suffix: '?v=6.8.0'
        }}
      />
    </div>
  )
}

