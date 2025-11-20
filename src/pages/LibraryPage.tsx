import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  Skeleton,
  Alert,
} from '@mui/material';

import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import AddIcon from '@mui/icons-material/Add';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FolderOffIcon from '@mui/icons-material/FolderOff';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFolders, createFolder, updateFolder, deleteFolder } from '../services/apiLibraryService';

import FolderDialog from '../components/library/FolderDialog';
import FileUploadDialog from '../components/library/FileUploadDialog';
import type { Folder } from '../types/folder.types';

function LibraryPage(): React.JSX.Element {
  const [openDialog, setOpenDialog] = useState(false);
  const [openFileDialog, setOpenFileDialog] = useState(false);
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null);

  const queryClient = useQueryClient();

  const { data: folders, isLoading, isError, error } = useQuery({
    queryKey: ['folders'],
    queryFn: getFolders,
  });

  const createMutation = useMutation({
    mutationFn: createFolder,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['folders'] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ folderId, data }: { folderId: number; data: { name: string; iconColor: string } }) =>
      updateFolder(folderId, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['folders'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFolder,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['folders'] }),
  });

  const handleSaveDialog = (data: { name: string; iconColor: string }) => {
    if (editingFolder) {
      updateMutation.mutate({ folderId: editingFolder.id, data });
    } else {
      createMutation.mutate(data);
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingFolder(null);
  };

  const handleDeleteClick = (folderId: number) => {
    if (window.confirm('Anda yakin ingin menghapus folder ini?')) {
      deleteMutation.mutate(folderId);
    }
  };

  const isEmpty = !isLoading && folders?.length === 0;

  // -----------------------------
  // LOADING SKELETON
  // -----------------------------
  if (isLoading) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>My Library</Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <Skeleton variant="rounded" width={140} height={42} />
          <Skeleton variant="rounded" width={200} height={42} />
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 24,
          }}
        >
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} variant="rounded" height={110} />
          ))}
        </Box>
      </Box>
    );
  }

  // -----------------------------
  // ERROR
  // -----------------------------
  if (isError) {
    return <Alert severity="error">Gagal mengambil data library: {error.message}</Alert>;
  }

  // -----------------------------
  // MAIN RENDER
  // -----------------------------
  return (
    <Box>
      <Typography variant="h4" fontWeight="600" gutterBottom>
        My Library
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        Organize your study materials neatly and efficiently.
      </Typography>

      {/* Header buttons */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditingFolder(null);
            setOpenDialog(true);
          }}
          sx={{
            textTransform: 'none',
            borderRadius: '10px',
            px: 3,
            py: 1.3,
            fontWeight: 600,
            color: 'white',
          }}
        >
          Add Folder
        </Button>

        <Button
          variant="outlined"
          startIcon={<DescriptionOutlinedIcon />}
          onClick={() => setOpenFileDialog(true)} 
          sx={{
            textTransform: 'none',
            borderRadius: '10px',
            px: 3,
            py: 1.3,
            fontWeight: 600,
          }}
        >
          Add File / Generate Quiz
        </Button>
      </Box>

      {/* List / Empty state */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr', // 1 kolom seperti desain kamu
          gap: 16,
        }}
      >
        {/* Empty state */}
        {isEmpty ? (
          <Paper
            sx={{
              p: 6,
              borderRadius: '14px',
              border: '2px dashed',
              borderColor: 'divider',
              textAlign: 'center',
            }}
          >
            <FolderOffIcon sx={{ fontSize: 60, opacity: 0.4, mb: 2 }} />
            <Typography variant="h6" fontWeight="600">
              Library Kosong
            </Typography>
            <Typography color="text.secondary">
              Belum ada folder. Klik "Add Folder" untuk membuat.
            </Typography>
          </Paper>
        ) : (
          folders?.map((folder) => (
            <Paper
              key={folder.id}
              elevation={0}
              sx={{
                p: 2.4,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                borderRadius: '14px',
                border: '1px solid',
                borderColor: 'divider',
                transition: '0.25s ease',
                cursor: 'pointer',
                bgcolor: 'background.paper',

                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.07)',
                  borderColor: 'primary.main',
                },
              }}
            >
              <FolderOutlinedIcon sx={{ color: folder.iconColor, fontSize: 42 }} />

              <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                <Typography
                  variant="h6"
                  fontWeight="600"
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: 1.2,
                  }}
                >
                  {folder.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontWeight: 600 }}
                >
                  {folder.fileCount} items
                </Typography>
              </Box>

              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingFolder(folder);
                  setOpenDialog(true);
                }}
              >
                <EditOutlinedIcon fontSize="small" />
              </IconButton>

              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(folder.id);
                }}
              >
                <DeleteOutlineIcon fontSize="small" sx={{ color: 'error.main' }} />
              </IconButton>
            </Paper>
          ))
        )}
      </Box>

      <FolderDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSave={handleSaveDialog}
        initialData={editingFolder}
      />
      <FileUploadDialog
        open={openFileDialog}
        onClose={() => setOpenFileDialog(false)}
      />
    </Box>
  );
}

export default LibraryPage;
