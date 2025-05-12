import React from 'react';
import styled from 'styled-components';
import Placeholder from '../components/common/Placeholder';

const ArticleContainer = styled.div`
  padding: 120px 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ArticleHeader = styled.div`
  margin-bottom: 3rem;
`;

const ArticleCategory = styled.div`
  color: #e60012;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`;

const ArticleTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const ArticleMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  color: #666;
  font-size: 0.9rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FeaturedImage = styled.div`
  width: 100%;
  height: 500px;
  margin-bottom: 3rem;
  border-radius: 8px;
  overflow: hidden;
`;

const ArticleContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SidebarSection = styled.div`
  background-color: #f8f8f8;
  padding: 1.5rem;
  border-radius: 8px;
`;

const SidebarTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
  position: relative;
  padding-bottom: 0.5rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 2px;
    background-color: #e60012;
  }
`;

const RelatedArticles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RelatedArticleItem = styled.a`
  display: flex;
  gap: 1rem;
  text-decoration: none;
  color: inherit;
  
  &:hover h4 {
    color: #e60012;
  }
`;

const RelatedArticleImage = styled.div`
  width: 80px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 4px;
  overflow: hidden;
`;

const RelatedArticleContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const RelatedArticleTitle = styled.h4`
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
  transition: color 0.2s ease;
`;

const RelatedArticleDate = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const ShareSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ShareButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #333;
  color: white;
  text-decoration: none;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #e60012;
  }
`;

const ArticleTemplate = ({ articleData }) => {
  // In a real implementation, articleData would be passed as props
  // For now, we'll use placeholder data
  const article = articleData || {
    title: 'Article Title',
    category: 'News',
    date: 'April 8, 2025',
    author: 'John Doe',
    relatedArticles: [
      { title: 'Related Article 1', date: 'April 5, 2025' },
      { title: 'Related Article 2', date: 'April 3, 2025' },
      { title: 'Related Article 3', date: 'March 28, 2025' }
    ]
  };

  return (
    <ArticleContainer>
      <ArticleHeader>
        <ArticleCategory>{article.category}</ArticleCategory>
        <ArticleTitle>{article.title}</ArticleTitle>
        <ArticleMeta>
          <MetaItem>
            <i className="far fa-calendar"></i>
            <span>{article.date}</span>
          </MetaItem>
          <MetaItem>
            <i className="far fa-user"></i>
            <span>{article.author}</span>
          </MetaItem>
        </ArticleMeta>
        <FeaturedImage>
          <Placeholder height="100%" label="Featured Image" />
        </FeaturedImage>
      </ArticleHeader>

      <ArticleContent>
        <MainContent>
          <Placeholder height="800px" label="Article Content" />
        </MainContent>

        <Sidebar>
          <SidebarSection>
            <SidebarTitle>Share</SidebarTitle>
            <ShareSection>
              <ShareButton href="#" aria-label="Share on Facebook">
                <i className="fab fa-facebook-f"></i>
              </ShareButton>
              <ShareButton href="#" aria-label="Share on Twitter">
                <i className="fab fa-twitter"></i>
              </ShareButton>
              <ShareButton href="#" aria-label="Share on LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </ShareButton>
              <ShareButton href="#" aria-label="Share via Email">
                <i className="far fa-envelope"></i>
              </ShareButton>
            </ShareSection>
          </SidebarSection>

          <SidebarSection>
            <SidebarTitle>Related Articles</SidebarTitle>
            <RelatedArticles>
              {article.relatedArticles.map((relatedArticle, index) => (
                <RelatedArticleItem href="#" key={index}>
                  <RelatedArticleImage>
                    <Placeholder height="100%" />
                  </RelatedArticleImage>
                  <RelatedArticleContent>
                    <RelatedArticleTitle>{relatedArticle.title}</RelatedArticleTitle>
                    <RelatedArticleDate>{relatedArticle.date}</RelatedArticleDate>
                  </RelatedArticleContent>
                </RelatedArticleItem>
              ))}
            </RelatedArticles>
          </SidebarSection>

          <SidebarSection>
            <SidebarTitle>Categories</SidebarTitle>
            <Placeholder height="150px" label="Categories List" />
          </SidebarSection>
        </Sidebar>
      </ArticleContent>
    </ArticleContainer>
  );
};

export default ArticleTemplate;
