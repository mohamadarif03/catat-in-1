// src/pages/LibraryPage.tsx
import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Paper, IconButton } from '@mui/material';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import AddIcon from '@mui/icons-material/Add';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FolderDialog from '../components/library/FolderDialog'; // Impor dialog Anda
import type { Folder } from '../types/folder.types'; // Impor tipe Folder

function LibraryPage(): React.JSX.Element {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null);
  const [folders, setFolders] = useState<Folder[]>([
    { id: 'f1', name: 'Biology Notes', iconColor: '#3E8EDE', createdAt: '2023-10-20', fileCount: 12 },
    { id: 'f2', name: 'History Essays', iconColor: '#FF8C42', createdAt: '2023-10-18', fileCount: 8 },
    { id: 'f3', name: 'Math Exercises', iconColor: '#28a745', createdAt: '2023-10-22', fileCount: 15 },
  ]);

  // Fungsi untuk menangani save (Create & Edit)
  const handleSaveDialog = (data: { name: string, iconColor: string }) => {
    if (editingFolder) {
      setFolders(prevFolders =>
        prevFolders.map(folder =>
          folder.id === editingFolder.id
            ? { ...folder, name: data.name, iconColor: data.iconColor } // Update folder yang cocok
            : folder
        )
      );
    } else {
      // --- Ini adalah MODE CREATE ---
      const newFolder: Folder = {
        id: `f${folders.length + 1}-${Date.now()}`,
        name: data.name,
        iconColor: data.iconColor,
        createdAt: new Date().toISOString().split('T')[0],
        fileCount: 0,
      };
      setFolders(prevFolders => [...prevFolders, newFolder]);
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingFolder(null); 
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Library
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        Organize your study materials here.
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
       <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditingFolder(null); 
              setOpenDialog(true);   
            }}
            sx={{ textTransform: 'none', color: 'white' }}
          >
            Add Folder
          </Button>
        <Button
          variant="outlined"
          startIcon={<DescriptionOutlinedIcon />}
          sx={{ textTransform: 'none' }}
        >
          Add File / Generate Quiz
        </Button>
      </Box>

      <Box
  sx={{
    display: "flex",
    flexDirection: "column",
    gap: 2,
  }}
>
  {folders.map((folder) => (
    <Paper
      key={folder.id}
      sx={{
        p: 2.5,
        display: "flex",
        alignItems: "center",
        borderRadius: 4,
        gap: 2.5,
        cursor: "pointer",
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        transition: "0.25s ease",
        border: "1px solid rgba(0,0,0,0.06)",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
          backgroundColor: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(4px)",
        },
      }}
    >
      {/* ICON SECTION */}
      <Box
        sx={{
          width: 55,
          height: 55,
          borderRadius: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: folder.iconColor + "15", // warna transparan modern
        }}
      >
        <FolderOutlinedIcon
          sx={{
            color: folder.iconColor,
            fontSize: 34,
          }}
        />
      </Box>

      {/* TEXT SECTION */}
      <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            letterSpacing: 0.3,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {folder.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 0.2,
            fontSize: "0.85rem",
          }}
        >
          {folder.fileCount} files • Created {folder.createdAt}
        </Typography>
      </Box>

      {/* EDIT BUTTON MODERN */}
      <IconButton
        size="small"
        sx={{
          padding: 1,
          borderRadius: 2,
          transition: "0.25s",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.06)",
          },
        }}
        onClick={(e) => {
          e.stopPropagation();
          setEditingFolder(folder);
          setOpenDialog(true);
        }}
      >
        <EditOutlinedIcon sx={{ fontSize: 20 }} />
      </IconButton>
    </Paper>
  ))}
</Box>



      <FolderDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSave={handleSaveDialog}
        initialData={editingFolder}
      />
    </Box>
  );
}

export default LibraryPage;