import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import NotesIcon from '@mui/icons-material/Notes';
import { useDropzone } from 'react-dropzone'; 


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`upload-tabpanel-${index}`}
      aria-labelledby={`upload-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3, pb: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}



interface FileUploadDialogProps {
  open: boolean;
  onClose: () => void;
}

function FileUploadDialog({ open, onClose }: FileUploadDialogProps): React.JSX.Element {
  const [tabValue, setTabValue] = useState(0); // 0 = PDF, 1 = YouTube, 2 = Teks
  const [file, setFile] = useState<File | null>(null);
  const [youtubeLink, setYoutubeLink] = useState('');
  const [pastedText, setPastedText] = useState('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] }, // Hanya terima PDF
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleCloseDialog = () => {
    onClose();
    setTimeout(() => {
      setFile(null);
      setTabValue(0);
      setYoutubeLink('');
      setPastedText('');
    }, 300);
  };
  
  const isGenerateDisabled = !file && !youtubeLink.trim() && !pastedText.trim();

  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      maxWidth="sm" 
      fullWidth
      PaperProps={{ sx: { borderRadius: '16px' } }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div" fontWeight="bold">
          Upload Your Study Material
        </Typography>
        <IconButton aria-label="close" onClick={handleCloseDialog} sx={{ color: (theme) => theme.palette.grey[500] }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ p: 0 }}>
        <Typography variant="body2" color="text.secondary" sx={{ px: 2, mb: 1 }}>
          Upload a PDF, paste a YouTube link, or add text to get an AI-powered summary.
        </Typography>
        
        {/* Kontrol Tab */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="upload options">
            <Tab label="Upload PDF" icon={<CloudUploadOutlinedIcon />} iconPosition="start" id="upload-tab-0" />
            <Tab label="YouTube Link" icon={<InsertLinkIcon />} iconPosition="start" id="upload-tab-1" />
            <Tab label="Paste Text" icon={<NotesIcon />} iconPosition="start" id="upload-tab-2" />
          </Tabs>
        </Box>

        {/* Panel Tab 1: Upload PDF */}
        <TabPanel value={tabValue} index={0}>
          {!file ? (
            // Dropzone (jika tidak ada file)
            <Box
              {...getRootProps()}
              sx={{
                border: '2px dashed',
                borderColor: isDragActive ? 'primary.main' : 'divider',
                borderRadius: '12px',
                p: 4,
                textAlign: 'center',
                cursor: 'pointer',
                bgcolor: isDragActive ? 'action.hover' : 'transparent',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '200px',
              }}
            >
              <input {...getInputProps()} />
              <CloudUploadOutlinedIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6">Drag & drop your PDF here</Typography>
              <Typography variant="body2" color="text.secondary">Maximum file size: 10MB</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>or</Typography>
              <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>
                Browse files
              </Button>
            </Box>
          ) : (
            <Chip
              label={`${file.name} (${formatBytes(file.size)})`}
              onDelete={handleRemoveFile}
              color="primary"
              variant="outlined"
              sx={{ width: '100%', justifyContent: 'space-between', p: 2, fontSize: '1rem' }}
            />
          )}
        </TabPanel>

        {/* Panel Tab 2: YouTube Link */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Paste a link to a YouTube video you want to summarize.
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="YouTube URL"
            placeholder="https://www.youtube.com/watch?v=..."
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
          />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Paste any text content you want to summarize.
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Your Text"
            placeholder="Copy and paste your study notes here..."
            multiline
            rows={8}
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
          />
        </TabPanel>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          variant="contained"
          color="primary" 
          onClick={() => { handleCloseDialog(); }}
          disabled={isGenerateDisabled}
          sx={{ textTransform: 'none', width: '100%', fontSize: '1rem', py: 1,color:'white' }}
        >
          Generate Summary with AI
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FileUploadDialog;