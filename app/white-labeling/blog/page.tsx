'use client'

import { useState } from 'react'
import { 
  Card, 
  Title,
  Text,
  Button,
} from '@tremor/react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { BlogPostList } from './components/blog-post-list'
import { BlogPostForm } from './components/blog-post-form'
import { BlogPost } from './types'

export default function WhiteLabelingBlogPage() {
  const [isCreating, setIsCreating] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)

  const handleCreateNew = () => {
    setEditingPost(null)
    setIsCreating(true)
  }

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post)
    setIsCreating(true)
  }

  const handleCancel = () => {
    setIsCreating(false)
    setEditingPost(null)
  }

  const handleSave = (post: BlogPost) => {
    // Save logic would go here
    // In a real app, you would make an API call to save the post
    console.log('Saving post:', post)
    setIsCreating(false)
    setEditingPost(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Title>Blog Management</Title>
          <Text className="text-gray-500">
            Manage blog posts for your white-labeled platform
          </Text>
        </div>
        {!isCreating && (
          <Button 
            icon={PlusIcon}
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleCreateNew}
          >
            Create New Post
          </Button>
        )}
      </div>

      {isCreating ? (
        <Card>
          <div className="mb-6">
            <Title>{editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}</Title>
            <Text className="text-gray-500">
              Fill in the details for your blog post
            </Text>
          </div>
          <BlogPostForm
            initialData={editingPost || undefined}
            onCancel={handleCancel}
            onSave={handleSave}
          />
        </Card>
      ) : (
        <BlogPostList onEdit={handleEditPost} />
      )}
    </div>
  )
} 