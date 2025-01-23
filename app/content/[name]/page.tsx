'use client';

import React, { useEffect, useState } from 'react';
import axios from '@/lib/axios'; // Centralized Axios instance
import {
  Breadcrumbs,
  Link as MuiLink,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

interface ContentData {
  id: number;
  category: string;
  categoryTitle: string;
  name: string;
  title: string;
  abstract: { text: string; author?: string; source?: string }[];
  text: string[];
  imageRhs: string;
  imageCtr: string;
}

interface CategoryData {
  id: number;
  name: string;
  title: string;
  theme: string;
  themeInv: string;
  subjects: { id: number; name: string; title: string; path: string }[];
}

export default function ContentPage({ params }: { params: { name: string } }) {
  const [content, setContent] = useState<ContentData | null>(null);
  const [category, setCategory] = useState<CategoryData | null>(null);
  const [categories, setCategories] = useState<CategoryData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

//   const { name } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Await resolution of `params`
        const resolvedParams = await params;
        const { name } = resolvedParams;

        // Fetch content by name
        const contentResponse = await axios.get(`http://localhost:5000/contents?name=${name}`);
        if (contentResponse.data.length > 0) {
          setContent(contentResponse.data[0]);
        } else {
          setError(`Content not found for name: ${name}`);
        }

        // Fetch category details for the current content
        if (contentResponse.data.length > 0) {
          const categoryName = contentResponse.data[0].category;
          const categoryResponse = await axios.get(`http://localhost:5000/categories?name=${categoryName}`);
          if (categoryResponse.data.length > 0) {
            setCategory(categoryResponse.data[0]);
          } else {
            setError(`Category not found for name: ${categoryName}`);
          }
        }

        // Fetch all top-level categories for the top menu
        const categoriesResponse = await axios.get('http://localhost:5000/categories');
        setCategories(categoriesResponse.data);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !content || !category || !categories) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          {error || 'An unexpected error occurred.'}
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      {/* Top Menu */}
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
        {categories.map((cat) => (
          <MuiLink key={cat.id} href={`/content/${cat.name}`} color="inherit">
            {cat.title}
          </MuiLink>
        ))}
      </Box>

      {/* Breadcrumb Navigation */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 2 }}>
        <MuiLink href="/" color="inherit">Home</MuiLink>
        <MuiLink href={`/content/${category.name}`} color="inherit">{category.title}</MuiLink>
        <Typography color="textPrimary">{content.title}</Typography>
      </Breadcrumbs>

      {/* Layout: Left Menu + Content */}
      <Box sx={{ display: 'flex', gap: 4 }}>
        {/* Left Menu */}
        <List sx={{ width: '20%' }}>
          {category.subjects.map((subject) => (
            <ListItem
              key={subject.id}
              component="a"
              href={`/content/${subject.name}`}
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              <ListItemText primary={subject.title} />
            </ListItem>
          ))}
        </List>

        {/* Page Content */}
        <Box sx={{ flex: 1 }}>
          <Card sx={{ display: 'flex', marginBottom: 4 }}>
            <CardMedia
              component="img"
              sx={{ width: 300 }}
              image={content.imageCtr || '/assets/images/default.jpg'}
              alt={content.title}
            />
            <CardContent>
              {content.abstract.map((item, index) => (
                <blockquote key={index}>
                  <Typography variant="body1">{item.text}</Typography>
                  {item.author && (
                    <footer>
                      <Typography variant="caption">
                        - {item.author}{item.source && `, ${item.source}`}
                      </Typography>
                    </footer>
                  )}
                </blockquote>
              ))}
            </CardContent>
          </Card>
          {content.text.map((paragraph, index) => (
            <Typography key={index} paragraph>{paragraph}</Typography>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
