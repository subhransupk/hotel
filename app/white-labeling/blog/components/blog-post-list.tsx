'use client'

import { useState } from 'react'
import Image from 'next/image'
import { 
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  Button,
  Card,
  Text
} from '@tremor/react'
import { 
  PencilIcon, 
  TrashIcon, 
  EyeIcon 
} from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import { BlogPost } from '../types'

// Sample data - in a real app, this would come from an API
const SAMPLE_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with White Labeling',
    image: '/images/blog/getting-started.jpg',
    date: '2023-10-15',
    readTime: '5 min',
    tags: ['Guide', 'White Labeling'],
    author: 'Jane Smith',
    authorDesignation: 'Product Manager',
    content: 'Full content would go here...',
    excerpt: 'Learn how to effectively use white labeling features to customize your platform...'
  },
  {
    id: '2',
    title: 'Customizing Your Brand Experience',
    image: '/images/blog/brand-experience.jpg',
    date: '2023-11-02',
    readTime: '8 min',
    tags: ['Branding', 'Design'],
    author: 'Michael Johnson',
    authorDesignation: 'UX Designer',
    content: 'Full content would go here...',
    excerpt: 'Discover the best practices for creating a cohesive brand experience...'
  },
  {
    id: '3',
    title: 'Increasing Engagement with Custom Content',
    image: '/images/blog/engagement.jpg',
    date: '2023-12-10',
    readTime: '6 min',
    tags: ['Marketing', 'Engagement'],
    author: 'Sarah Williams',
    authorDesignation: 'Content Strategist',
    content: 'Full content would go here...',
    excerpt: 'Strategies to boost user engagement through customized content...'
  }
]

interface BlogPostListProps {
  onEdit: (post: BlogPost) => void
}

export function BlogPostList({ onEdit }: BlogPostListProps) {
  const [posts, setPosts] = useState<BlogPost[]>(SAMPLE_BLOG_POSTS)

  const handleDelete = (id: string) => {
    setPosts(posts.filter(post => post.id !== id))
  }

  // Format date in a consistent way that doesn't depend on locale
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd');
  }

  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell className="w-[250px]">Title</TableHeaderCell>
            <TableHeaderCell>Author</TableHeaderCell>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Read Time</TableHeaderCell>
            <TableHeaderCell>Tags</TableHeaderCell>
            <TableHeaderCell className="text-right">Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                <Text>No blog posts found. Create your first post!</Text>
              </TableCell>
            </TableRow>
          ) : (
            posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 relative overflow-hidden rounded">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="truncate max-w-[180px]">{post.title}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <Text>{post.author}</Text>
                    <Text className="text-sm text-gray-500">{post.authorDesignation}</Text>
                  </div>
                </TableCell>
                <TableCell>{formatDate(post.date)}</TableCell>
                <TableCell>{post.readTime}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((tag) => (
                      <Badge key={tag} color="blue" size="xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="secondary" 
                      size="xs" 
                      icon={EyeIcon}
                      tooltip="Preview"
                    />
                    <Button 
                      variant="secondary" 
                      size="xs" 
                      icon={PencilIcon}
                      tooltip="Edit"
                      onClick={() => onEdit(post)}
                    />
                    <Button 
                      variant="secondary" 
                      size="xs" 
                      icon={TrashIcon}
                      tooltip="Delete"
                      onClick={() => handleDelete(post.id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  )
} 